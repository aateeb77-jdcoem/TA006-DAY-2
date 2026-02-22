import Link from "next/link"
import {
  ShieldCheck,
  Users,
  Leaf,
  MapPin,
  Mail,
  Search,
  Handshake,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

const features = [
  {
    icon: ShieldCheck,
    title: "Campus-Only Access",
    description:
      "Verified college email ensures only students from your university can trade.",
  },
  {
    icon: Users,
    title: "Trust-Based Profiles",
    description:
      "Every user builds a trust score through honest transactions and reviews.",
  },
  {
    icon: Leaf,
    title: "Sustainability Impact",
    description:
      "Track your positive environmental impact by reusing items instead of buying new.",
  },
  {
    icon: MapPin,
    title: "Safe Campus Meetups",
    description:
      "Exchange items in designated campus zones for maximum safety and convenience.",
  },
]

const steps = [
  {
    icon: Mail,
    step: "01",
    title: "Register with College Email",
    description:
      "Sign up using your university email to verify your student identity.",
  },
  {
    icon: Search,
    step: "02",
    title: "List or Browse Items",
    description:
      "Upload items to sell or browse listings from fellow students on campus.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Exchange Safely on Campus",
    description:
      "Meet in designated campus zones and complete your transaction safely.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              CampusCart
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-[0.07]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Verified students only</span>
          </div>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            A Verified, Scam-Free Campus Marketplace
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Buy & sell furniture, books, and electronics safely within your
            college. No strangers, no scams -- just your campus community.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 px-8">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" size="lg" className="px-8">
                Explore Marketplace
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-foreground">2,000+</p>
              <p className="mt-1 text-sm text-muted-foreground">Active students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">5,400+</p>
              <p className="mt-1 text-sm text-muted-foreground">Items traded</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">12 tons</p>
              <p className="mt-1 text-sm text-muted-foreground">{'CO\u2082 saved'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground">
              Why Students Trust CampusCart
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Built specifically for campus communities, designed with safety and
              sustainability at its core.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Get started in minutes. It&apos;s as easy as 1-2-3.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="relative text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                    Step {step.step}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-balance text-3xl font-bold text-primary-foreground">
            Ready to join your campus marketplace?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
            Sign up with your college email and start buying, selling, and
            saving today.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="mt-6 gap-2 px-8"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
