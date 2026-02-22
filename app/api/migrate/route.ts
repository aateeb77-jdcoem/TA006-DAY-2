import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// This route uses a SECURITY DEFINER SQL function to run DDL
// It calls a stored procedure that creates the listings table
export async function GET() {
    const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // First, deploy a temp DDL function using the same approach as create_user_direct
    // We call supabase with service role which bypasses RLS and can run raw SQL via query()

    // Use the Supabase Admin SQL endpoint (available with service role)
    const createTableSQL = `
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
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='listings') THEN
        ALTER TABLE IF EXISTS public.listings ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "public_select" ON public.listings FOR SELECT USING (true);
        CREATE POLICY "owner_insert" ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
        CREATE POLICY "owner_update" ON public.listings FOR UPDATE USING (auth.uid() = seller_id);
      END IF;
    END $$;

    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES ('listing-images', 'listing-images', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
    ON CONFLICT (id) DO UPDATE SET public = true;
    
    DO $$ BEGIN
      IF NOT EXISTS (SELECT FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Public listing images') THEN
        CREATE POLICY "Public listing images" ON storage.objects FOR SELECT USING (bucket_id = 'listing-images');
        CREATE POLICY "Auth users upload listing images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');
      END IF;
    END $$;
  `

    // Use the Supabase management API via admin SDK query endpoint
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/create_listings_setup`,
        {
            method: "POST",
            headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
                "Content-Type": "application/json",
            },
            body: "{}",
        }
    )

    if (res.ok) {
        return NextResponse.json({ success: true, message: "Setup completed via RPC" })
    }

    // Fallback: try to just check if table exists
    const { error: checkErr } = await admin.from("listings").select("id").limit(1)
    if (!checkErr) {
        return NextResponse.json({ success: true, message: "listings table already exists" })
    }

    // Table doesn't exist, return the SQL for manual execution
    return NextResponse.json({
        needsManualSetup: true,
        message: "Please run the following SQL in your Supabase SQL editor",
        url: `https://supabase.com/dashboard/project/mvnkzyglueybjmnulqbc/sql/new`,
        sql: createTableSQL.trim(),
    }, { status: 503 })
}
