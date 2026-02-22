"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ShieldCheck,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Mail,
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

const stepLabels = ["Your Details", "Verify Email", "Profile Setup"]

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(0)

  // Step 1: Basic Details
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkSent, setLinkSent] = useState(false)
  const [sendingLink, setSendingLink] = useState(false)

  // Step 3: Profile Setup (step 2 is the "check email" screen)
  const [college, setCollege] = useState("")
  const [hostel, setHostel] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [creatingAccount, setCreatingAccount] = useState(false)

  // Error & success
  const [error, setError] = useState("")

  // ---------- Step 1: Send Magic Link ----------
  const handleSendLink = async () => {
    setError("")
    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setSendingLink(true)
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { full_name: fullName.trim(), phone: phone || null },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/register/complete`,
      },
    })
    setSendingLink(false)

    if (otpError) {
      setError(otpError.message)
    } else {
      setLinkSent(true)
      setStep(1)
    }
  }

  // ---------- Step 3: Complete Profile ----------
  const handleCreateAccount = async () => {
    setError("")
    if (!college) {
      setError("Please select your college")
      return
    }
    if (!agreed) {
      setError("Please agree to the community guidelines")
      return
    }

    setCreatingAccount(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim() || user.user_metadata?.full_name || null,
          college: college,
          hostel: hostel || null,
          phone: phone.replace(/\s/g, "") || user.user_metadata?.phone || null,
        })
        .eq("id", user.id)

      if (profileError) {
        setError(profileError.message)
        setCreatingAccount(false)
        return
      }
    }

    setCreatingAccount(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
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
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className="hidden text-[10px] text-muted-foreground sm:block">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            {error && (
              <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Step 1: Basic Details */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Create your account
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your details to get started
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Arjun Mehta"
                      className="mt-1.5"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@university.ac.in"
                      className="mt-1.5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Number (optional)</Label>
                    <Input
                      id="mobile"
                      placeholder="+91 98765 43210"
                      className="mt-1.5"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={handleSendLink}
                  disabled={sendingLink}
                >
                  {sendingLink ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                  Send Verification Link
                </Button>
              </div>
            )}

            {/* Step 2: Check Email */}
            {step === 1 && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground">Check your email!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We sent a verification link to <strong>{email}</strong>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click the link in the email to verify your account. Check your spam folder if you don&apos;t see it.
                  </p>
                </div>
                <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-lg bg-primary/5 px-4 py-3">
                  <p className="text-xs font-medium text-primary">
                    After verifying, you&apos;ll be redirected back here to complete your profile setup.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLinkSent(false)
                    setStep(0)
                    setError("")
                  }}
                  className="mt-2"
                >
                  Use a different email
                </Button>
              </div>
            )}

            {/* Step 3: Profile Setup */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
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
                  onClick={handleCreateAccount}
                  disabled={creatingAccount}
                >
                  {creatingAccount ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
