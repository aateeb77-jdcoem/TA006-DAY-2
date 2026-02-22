"use client"

import Link from "next/link"
import {
  Star,
  Calendar,
  School,
  MapPin,
  Edit,
  ShoppingBag,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockUser, mockItems } from "@/lib/mock-data"

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {mockUser.avatar}
              </div>
              <h1 className="mt-4 text-xl font-bold text-foreground">
                {mockUser.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {mockUser.email}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
                Trust Score: {mockUser.trustScore}
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <School className="h-4 w-4" />
                <span>{mockUser.college}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{mockUser.hostel}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {mockUser.joinedDate}</span>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-bold text-foreground">
                  {mockUser.listings}
                </p>
                <p className="text-xs text-muted-foreground">Listed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {mockUser.itemsSold}
                </p>
                <p className="text-xs text-muted-foreground">Sold</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {mockUser.itemsBought}
                </p>
                <p className="text-xs text-muted-foreground">Bought</p>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-muted-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              My Listings
            </h2>
            <Link href="/list-item">
              <Button size="sm" className="gap-1">
                <ShoppingBag className="h-4 w-4" />
                New Listing
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockItems.slice(0, 4).map((item) => (
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
                    <span className="shrink-0 font-bold text-primary">
                      ₹{item.price}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5">
                      {item.condition}
                    </span>
                    <span>{item.listedDate}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
