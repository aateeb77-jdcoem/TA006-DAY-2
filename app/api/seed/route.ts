import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
    const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Use the create_user_direct RPC pattern — call a raw SQL function via rpc
    // Actually, Supabase pg REST doesn't support DDL, so we use the admin SDK
    // to check & create via the management REST API
    const createSQL = `
    CREATE TABLE IF NOT EXISTS public.listings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      price NUMERIC NOT NULL,
      category TEXT NOT NULL,
      condition TEXT NOT NULL,
      location TEXT DEFAULT '',
      images TEXT[] DEFAULT '{}',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    DO $$ BEGIN
      IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'listings' AND policyname = 'Anyone can view listings') THEN
        ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Anyone can view listings" ON public.listings FOR SELECT USING (status = 'active');
        CREATE POLICY "Seller can insert" ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
        CREATE POLICY "Seller can update" ON public.listings FOR UPDATE USING (auth.uid() = seller_id);
      END IF;
    END $$;

    INSERT INTO public.storage.buckets (id, name, public)
    VALUES ('listing-images', 'listing-images', true)
    ON CONFLICT (id) DO NOTHING;
  `

    // Try to execute via Supabase management API
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`,
        {
            method: "POST",
            headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sql: createSQL }),
        }
    )

    if (!response.ok) {
        // Fallback: just verify table exists
        const { error } = await admin.from("listings").select("id").limit(1)
        if (error && error.code === "42P01") {
            return NextResponse.json({
                error: "listings table does not exist. Please run the SQL migration in Supabase dashboard.",
                sql: `CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  location TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view listings" ON public.listings FOR SELECT USING (status = 'active');
CREATE POLICY "Seller can insert" ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Seller can update" ON public.listings FOR UPDATE USING (auth.uid() = seller_id);`,
            }, { status: 500 })
        }
        return NextResponse.json({ success: true, message: "Table already exists" })
    }

    return NextResponse.json({ success: true, message: "Setup complete" })
}
