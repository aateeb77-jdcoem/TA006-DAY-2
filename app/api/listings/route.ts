import { NextRequest, NextResponse } from "next/server"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Ensure listings table exists (idempotent)
async function ensureListingsTable() {
    const admin = createAdminClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
    })

    // Use RPC to run raw SQL (via pg function if available, else skip)
    // Check if table exists via a simple query
    const { error } = await admin.from("listings").select("id").limit(1)
    if (error && error.code === "42P01") {
        // Table doesn't exist — create via the create_user_direct pattern won't work here
        // We'll just log and proceed; the user needs to run the migration
        console.error("listings table missing — please run migration")
    }
}

export async function POST(request: NextRequest) {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, price, category, condition, location, images } = body

    if (!title || !price || !category || !condition) {
        return NextResponse.json({ error: "Title, price, category, and condition are required" }, { status: 400 })
    }

    const admin = createAdminClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data, error } = await admin
        .from("listings")
        .insert({
            seller_id: user.id,
            title: title.trim(),
            description: description?.trim() || "",
            price: Number(price),
            category,
            condition,
            location: location || "",
            images: images || [],
            status: "active",
        })
        .select("id")
        .single()

    if (error) {
        console.error("Insert error:", error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, id: data.id })
}

export async function GET() {
    const admin = createAdminClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data: listings, error } = await admin
        .from("listings")
        .select("id, title, description, price, category, condition, location, images, status, created_at, seller_id")
        .eq("status", "active")
        .order("created_at", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!listings || listings.length === 0) return NextResponse.json([])

    // Fetch seller names from profiles
    const sellerIds = [...new Set((listings as { seller_id: string }[]).map((l) => l.seller_id))]
    const { data: profiles } = await admin
        .from("profiles")
        .select("id, full_name")
        .in("id", sellerIds)

    const profileMap = new Map(((profiles ?? []) as { id: string; full_name: string }[]).map((p) => [p.id, p]))

    const enriched = (listings as { seller_id: string;[k: string]: unknown }[]).map((l) => ({
        ...l,
        seller_name: profileMap.get(l.seller_id)?.full_name ?? "Campus Seller",
    }))

    return NextResponse.json(enriched)
}
