"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    ShieldCheck,
    Upload,
    ArrowRight,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

export default function CompleteProfilePage() {
    const router = useRouter()
    const supabase = createClient()

    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [college, setCollege] = useState("")
    const [hostel, setHostel] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    // Pre-fill user data from auth metadata
    useEffect(() => {
        const loadUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push("/register")
                return
            }
            setFullName(user.user_metadata?.full_name || "")
            setPhone(user.user_metadata?.phone || "")
            setLoading(false)
        }
        loadUser()
    }, [supabase, router])

    const handleSave = async () => {
        setError("")
        if (!fullName.trim()) {
            setError("Please enter your full name")
            return
        }
        if (!college) {
            setError("Please select your college")
            return
        }
        if (!agreed) {
            setError("Please agree to the community guidelines")
            return
        }

        setSaving(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { error: profileError } = await supabase
                .from("profiles")
                .update({
                    full_name: fullName.trim(),
                    college: college,
                    hostel: hostel || null,
                    phone: phone.replace(/\s/g, "") || null,
                })
                .eq("id", user.id)

            if (profileError) {
                setError(profileError.message)
                setSaving(false)
                return
            }
        }

        setSaving(false)
        router.push("/dashboard")
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="border-b border-border bg-card/80 backdrop-blur-lg">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold text-foreground">
                            CampusCart
                        </span>
                    </Link>
                </div>
            </header>

            <main className="flex flex-1 items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                        {error && (
                            <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="mb-1 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
                            ✅ Email verified! Complete your profile to get started.
                        </div>

                        <div className="mt-5 flex flex-col gap-5">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Set up your profile
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Complete your campus identity
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center">
                                    <button className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-dashed border-border bg-muted text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                                        <Upload className="h-6 w-6" />
                                        <span className="mt-1 text-[10px]">Photo</span>
                                    </button>
                                </div>
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        className="mt-1.5"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Mobile Number (optional)</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+91 98765 43210"
                                        className="mt-1.5"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>College / University</Label>
                                    <Select value={college} onValueChange={setCollege}>
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue placeholder="Select your college" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IIT Delhi">IIT Delhi</SelectItem>
                                            <SelectItem value="IIT Bombay">IIT Bombay</SelectItem>
                                            <SelectItem value="IIT Madras">IIT Madras</SelectItem>
                                            <SelectItem value="BITS Pilani">BITS Pilani</SelectItem>
                                            <SelectItem value="NIT Trichy">NIT Trichy</SelectItem>
                                            <SelectItem value="PCE">Pillai College of Engineering</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Hostel / Department</Label>
                                    <Select value={hostel} onValueChange={setHostel}>
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue placeholder="Select hostel or department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Hostel Block A">Hostel Block A</SelectItem>
                                            <SelectItem value="Hostel Block B">Hostel Block B</SelectItem>
                                            <SelectItem value="Hostel Block C">Hostel Block C</SelectItem>
                                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                                            <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        id="agree"
                                        checked={agreed}
                                        onCheckedChange={(v) => setAgreed(v === true)}
                                        className="mt-0.5"
                                    />
                                    <Label htmlFor="agree" className="text-sm leading-relaxed text-muted-foreground">
                                        I agree to the community guidelines and terms of service
                                    </Label>
                                </div>
                            </div>
                            <Button
                                className="w-full gap-1"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : null}
                                Create Account
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
