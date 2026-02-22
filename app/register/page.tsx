"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ShieldCheck,
  Upload,
  Check,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  UserPlus,
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

const stepLabels = ["Verify ID", "Profile Setup"]

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(0)

  // Step 1
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [detectedName, setDetectedName] = useState("")
  const [fakeEmail, setFakeEmail] = useState("")

  // Step 2: Profile Setup
  const [college, setCollege] = useState("")
  const [hostel, setHostel] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState("")

  // ---------- Step 1: Verify Student ID ----------
  const handleVerify = async () => {
    setError("")
    if (!studentId.trim()) {
      setError("Please enter your Student ID")
      return
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setVerifying(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: studentId.trim().toUpperCase(), password }),
    })
    const result = await res.json()
    setVerifying(false)

    if (!res.ok) {
      setError(result.error || "Registration failed")
      return
    }

    // Sign in immediately to establish session
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: result.fakeEmail,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      return
    }

    setDetectedName(result.fullName)
    setFakeEmail(result.fakeEmail)
    setStep(1)
  }

  // ---------- Step 2: Complete Profile ----------
  const handleCreateAccount = async () => {
    setError("")
    if (!agreed) {
      setError("Please agree to the community guidelines")
      return
    }

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase.from("profiles").update({
        college: college || null,
        hostel: hostel || null,
      }).eq("id", user.id)
    }

    setSaving(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">CampusCart</span>
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account?
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${i < step ? "bg-primary text-primary-foreground"
                      : i === step ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className="hidden text-[10px] text-muted-foreground sm:block">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${((step + 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            {error && (
              <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Step 1: Student ID + Password */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Create your account</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your Student ID and choose a password
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input
                      id="student-id"
                      placeholder="e.g. BT240001"
                      className="mt-1.5 uppercase"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your name will be auto-filled from the student list
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter your password"
                      className="mt-1.5"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleVerify() }}
                    />
                  </div>
                </div>
                <Button className="w-full gap-2" onClick={handleVerify} disabled={verifying}>
                  {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  Verify & Continue
                </Button>
              </div>
            )}

            {/* Step 2: Profile Setup */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <div className="mb-3 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary font-medium">
                    ✅ Welcome, {detectedName}! Your identity is verified.
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Complete your profile</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your campus details (optional)
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
                    <Label>College / University</Label>
                    <Select value={college} onValueChange={setCollege}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PCE">Pillai College of Engineering</SelectItem>
                        <SelectItem value="IIT Delhi">IIT Delhi</SelectItem>
                        <SelectItem value="IIT Bombay">IIT Bombay</SelectItem>
                        <SelectItem value="BITS Pilani">BITS Pilani</SelectItem>
                        <SelectItem value="NIT Trichy">NIT Trichy</SelectItem>
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
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                        <SelectItem value="Hostel Block A">Hostel Block A</SelectItem>
                        <SelectItem value="Hostel Block B">Hostel Block B</SelectItem>
                        <SelectItem value="Hostel Block C">Hostel Block C</SelectItem>
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
                <Button className="w-full gap-1" onClick={handleCreateAccount} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Enter CampusCart
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
