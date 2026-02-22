import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const STUDENTS: { student_id: string; full_name: string }[] = [
    { student_id: "BT240001", full_name: "Aarav Sharma" },
    { student_id: "BT240002", full_name: "Aditi Verma" },
    { student_id: "BT240003", full_name: "Arjun Patel" },
    { student_id: "BT240004", full_name: "Diya Singh" },
    { student_id: "BT240005", full_name: "Rohan Gupta" },
    { student_id: "BT240006", full_name: "Priya Desai" },
    { student_id: "BT240007", full_name: "Kartik Iyer" },
    { student_id: "BT240008", full_name: "Sneha Joshi" },
    { student_id: "BT240009", full_name: "Vikram Nair" },
    { student_id: "BT240010", full_name: "Ananya Reddy" },
    { student_id: "BT240011", full_name: "Rahul Kapoor" },
    { student_id: "BT240012", full_name: "Neha Menon" },
    { student_id: "BT240013", full_name: "Aditya Bhat" },
    { student_id: "BT240014", full_name: "Kavya Pillai" },
    { student_id: "BT240015", full_name: "Siddharth Rao" },
    { student_id: "BT240016", full_name: "Riya Das" },
    { student_id: "BT240017", full_name: "Karan Mehta" },
    { student_id: "BT240018", full_name: "Pooja Sen" },
    { student_id: "BT240019", full_name: "Yash Agarwal" },
    { student_id: "BT240020", full_name: "Shruti Jain" },
    { student_id: "BT240021", full_name: "Dev Khanna" },
    { student_id: "BT240022", full_name: "Nisha Kaur" },
    { student_id: "BT240023", full_name: "Manish Ahuja" },
    { student_id: "BT240024", full_name: "Meera Chopra" },
    { student_id: "BT240025", full_name: "Kunal Thakur" },
    { student_id: "BT240026", full_name: "Ishita Bose" },
    { student_id: "BT240027", full_name: "Varun Prasad" },
    { student_id: "BT240028", full_name: "Tanvi Mistry" },
    { student_id: "BT240029", full_name: "Prateek Sinha" },
    { student_id: "BT240030", full_name: "Ritu Tiwari" },
    { student_id: "BT240031", full_name: "Ayush Pandey" },
    { student_id: "BT240032", full_name: "Kritika Shukla" },
    { student_id: "BT240033", full_name: "Sameer Choudhury" },
    { student_id: "BT240034", full_name: "Anjali Rajput" },
    { student_id: "BT240035", full_name: "Tarun Kumar" },
    { student_id: "BT240036", full_name: "Swati Mishra" },
    { student_id: "BT240037", full_name: "Nitin Soni" },
    { student_id: "BT240038", full_name: "Aishwarya Shenoy" },
    { student_id: "BT240039", full_name: "Rishabh Varma" },
    { student_id: "BT240040", full_name: "Kiran Chawla" },
    { student_id: "BT240041", full_name: "Harish D'Souza" },
    { student_id: "BT240042", full_name: "Divya Bhatt" },
    { student_id: "BT240043", full_name: "Sanjay Trivedi" },
    { student_id: "BT240044", full_name: "Roshni Naidu" },
    { student_id: "BT240045", full_name: "Akshay Kadam" },
    { student_id: "BT240046", full_name: "Nidhi Rathi" },
    { student_id: "BT240047", full_name: "Vivek Saxena" },
    { student_id: "BT240048", full_name: "Jyoti Mahajan" },
    { student_id: "BT240049", full_name: "Chetan Bansal" },
    { student_id: "BT240050", full_name: "Monika Kulkarni" },
    { student_id: "BT240051", full_name: "Gaurav Deshmukh" },
    { student_id: "BT240052", full_name: "Shreya Patil" },
    { student_id: "BT240053", full_name: "Amit Jadhav" },
    { student_id: "BT240054", full_name: "Sonali Wagh" },
    { student_id: "BT240055", full_name: "Deepak Pawar" },
    { student_id: "BT240056", full_name: "Pallavi Gokhale" },
    { student_id: "BT240057", full_name: "Vikas Kale" },
    { student_id: "BT240058", full_name: "Shilpa Shinde" },
    { student_id: "BT240059", full_name: "Rajat Bhosale" },
    { student_id: "BT240060", full_name: "Mansi Kadam" },
]

// Look up student from in-memory list (no DB lookup needed for whitelist check)
function findStudent(id: string) {
    return STUDENTS.find((s) => s.student_id === id.trim().toUpperCase()) ?? null
}

// Check registration status and upsert via raw REST (avoids TypeScript generics issue)
async function checkAndMarkRegistered(studentId: string): Promise<{ registered: boolean; error?: string }> {
    const res = await fetch(
        `${SUPABASE_URL}/rest/v1/allowed_students?student_id=eq.${encodeURIComponent(studentId)}&select=student_id,is_registered`,
        {
            headers: {
                apikey: SERVICE_KEY,
                Authorization: `Bearer ${SERVICE_KEY}`,
                "Content-Type": "application/json",
            },
        }
    )

    if (!res.ok) {
        // Table may not exist yet — treat as not registered (we'll create via seed)
        return { registered: false }
    }

    const rows: { student_id: string; is_registered: boolean }[] = await res.json()
    if (rows.length === 0) return { registered: false }
    if (rows[0].is_registered) return { registered: true }

    // Mark as registered
    await fetch(
        `${SUPABASE_URL}/rest/v1/allowed_students?student_id=eq.${encodeURIComponent(studentId)}`,
        {
            method: "PATCH",
            headers: {
                apikey: SERVICE_KEY,
                Authorization: `Bearer ${SERVICE_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
            },
            body: JSON.stringify({ is_registered: true }),
        }
    )
    return { registered: false }
}

export async function POST(request: NextRequest) {
    const { studentId, password } = await request.json()

    if (!studentId || !password) {
        return NextResponse.json({ error: "Student ID and password are required" }, { status: 400 })
    }
    if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // 1. Check whitelist (in-memory)
    const student = findStudent(studentId)
    if (!student) {
        return NextResponse.json(
            { error: "Student ID not found. You are not on the registered list." },
            { status: 403 }
        )
    }

    // 2. Check if already registered (DB)
    const { registered } = await checkAndMarkRegistered(student.student_id)
    if (registered) {
        return NextResponse.json(
            { error: "This Student ID has already been registered. Please log in instead." },
            { status: 409 }
        )
    }

    // 3. Create auth user — no email sent, uses studentId@campuscart.local
    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
    })

    const fakeEmail = `${student.student_id.toLowerCase()}@campuscart.local`

    const { data, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: fakeEmail,
        password,
        email_confirm: true,
        user_metadata: { full_name: student.full_name, student_id: student.student_id },
    })

    if (createError) {
        // If user already exists in auth, still let them proceed
        if (!createError.message.includes("already")) {
            return NextResponse.json({ error: createError.message }, { status: 400 })
        }
    }

    // 4. Create / update profile row
    if (data?.user) {
        await supabaseAdmin.from("profiles").upsert({
            id: data.user.id,
            full_name: student.full_name,
        })
    }

    return NextResponse.json({
        success: true,
        fullName: student.full_name,
        fakeEmail,
    })
}
