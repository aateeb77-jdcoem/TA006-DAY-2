"use client"

import Link from "next/link"
import { useState } from "react"
import { ShieldCheck, Loader2, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const [error, setError] = useState("")

  const handleSendLink = async () => {
    setError("")
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)

    if (otpError) {
      setError(otpError.message)
    } else {
      setLinkSent(true)
    }
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
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Log in to your campus marketplace
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {!linkSent ? (
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@university.ac.in"
                    className="mt-1.5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendLink()
                    }}
                  />
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={handleSendLink}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                  Send Magic Link
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground">Check your email!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We sent a login link to <strong>{email}</strong>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click the link in the email to sign in. Check spam if you don&apos;t see it.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLinkSent(false)
                    setEmail("")
                  }}
                  className="mt-2"
                >
                  Use a different email
                </Button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
