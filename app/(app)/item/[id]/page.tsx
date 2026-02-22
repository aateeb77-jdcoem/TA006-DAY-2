"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Leaf,
  MessageSquare,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockItems } from "@/lib/mock-data"
import { StarRating, TrustBadge } from "@/components/star-rating"

type ItemType = {
  id: string
  title: string
  price: number
  category: string
  condition: string
  description: string
  images: string[]
  location: string
  listedDate: string
  seller: { name: string; college: string; avatar: string; trustScore: number }
}

export default function ItemDetailPage() {
  const params = useParams()
  const [currentImage, setCurrentImage] = useState(0)
  const [item, setItem] = useState<ItemType | null>(null)

  useEffect(() => {
    const id = params.id as string

    // Check localStorage first for locally posted items
    if (id.startsWith("local-")) {
      try {
        const stored = localStorage.getItem("campus_cart_listings")
        if (stored) {
          const listings: {
            id: string; title: string; price: number; category: string;
            condition: string; description?: string; images?: string[];
            location?: string; created_at?: string; seller_name?: string;
          }[] = JSON.parse(stored)
          const found = listings.find((l) => l.id === id)
          if (found) {
            setItem({
              id: found.id,
              title: found.title,
              price: found.price,
              category: found.category,
              condition: found.condition,
              description: found.description ?? "",
              images: found.images?.length ? found.images : ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"],
              location: found.location ?? "Campus",
              listedDate: found.created_at ? new Date(found.created_at).toLocaleDateString("en-IN") : "Today",
              seller: {
                name: found.seller_name ?? "Campus Seller",
                college: "PCE",
                avatar: (found.seller_name ?? "CS").split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
                trustScore: 4.5,
              },
            })
            return
          }
        }
      } catch { /* ignore */ }
    }

    // Fall back to mock data
    const mock = mockItems.find((i) => i.id === id) ?? mockItems[0]
    setItem({
      id: mock.id,
      title: mock.title,
      price: mock.price,
      category: mock.category,
      condition: mock.condition,
      description: mock.description,
      images: mock.images,
      location: mock.location,
      listedDate: mock.listedDate ?? mock.posted,
      seller: {
        name: mock.seller.name,
        college: mock.seller.college,
        avatar: mock.seller.avatar,
        trustScore: mock.seller.trustScore,
      },
    })
  }, [params.id])

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % (item?.images.length ?? 1))
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + (item?.images.length ?? 1)) % (item?.images.length ?? 1)
    )

  if (!item) return (
    <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
      Loading...
    </div>
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/marketplace"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          <div className="aspect-square">
            <img
              src={item.images[currentImage]}
              alt={`${item.title} - image ${currentImage + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
          {item.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-card"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-card"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {item.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-2 w-2 rounded-full transition-all ${i === currentImage
                      ? "w-6 bg-primary-foreground"
                      : "bg-primary-foreground/50"
                      }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{item.category}</Badge>
              <Badge variant="outline">{item.condition}</Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                <ShieldCheck className="mr-1 h-3 w-3" />
                Fair Price
              </Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-foreground">
              {item.title}
            </h1>
            <p className="mt-1 text-3xl font-bold text-primary">
              ₹{item.price}
            </p>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {item.location}
            </div>
            <span>{'|'}</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {item.listedDate}
            </div>
          </div>

          <Separator />

          {/* Seller Card */}
          <div className="rounded-xl border border-border bg-background p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Seller
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {item.seller.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {item.seller.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.seller.college}
                </p>
                <StarRating score={item.seller.trustScore} className="mt-1" />
              </div>
              <TrustBadge score={item.seller.trustScore} />
            </div>
          </div>

          {/* Sustainability */}
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-4">
            <Leaf className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground">
              <span className="font-medium">You save money and reduce waste</span>{" "}
              -- buying pre-owned items keeps them out of landfills.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link href="/chat" className="flex-1">
              <Button className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with Seller
              </Button>
            </Link>
            <Button variant="outline" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Reserve Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
