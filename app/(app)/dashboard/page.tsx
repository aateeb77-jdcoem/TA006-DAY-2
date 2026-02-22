"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ShoppingBag,
  Heart,
  MessageSquare,
  Star,
  Leaf,
  Plus,
  Search,
  Package,
  TrendingUp,
  Recycle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockItems } from "@/lib/mock-data"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const supabase = createClient()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Try profile table first, fall back to auth metadata, then email
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single()

        const name =
          profile?.full_name ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "there"
        setUserName(name)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const firstName = userName?.split(" ")[0] ?? ""

  const stats = [
    {
      icon: Package,
      label: "My Listings",
      value: 0,
      href: "/profile",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Heart,
      label: "Saved Items",
      value: 3,
      href: "/marketplace",
      color: "bg-accent/20 text-accent-foreground",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: 5,
      href: "/chat",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      icon: Star,
      label: "Trust Score",
      value: "4.8",
      href: "/profile",
      color: "bg-primary/10 text-primary",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Greeting */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                Welcome back <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </span>
            ) : (
              `Welcome back, ${firstName}!`
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening on your campus marketplace
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/list-item">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              List an Item
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Sustainability Impact */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Your Sustainability Impact
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-background p-4">
            <div className="flex items-center gap-2">
              <Recycle className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Items Reused</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">0</p>
          </div>
          <div className="rounded-xl bg-background p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">CO₂ Saved</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">0 kg</p>
          </div>
          <div className="rounded-xl bg-background p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Money Saved</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">₹0</p>
          </div>
        </div>
      </div>

      {/* Recent Listings */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Campus Listings
          </h2>
          <Link
            href="/marketplace"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockItems.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-lg font-bold text-primary">
                    ₹{item.price}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-accent" />
                    {item.seller.trustScore}
                  </div>
                  <span>{'|'}</span>
                  <span>{item.seller.college}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
