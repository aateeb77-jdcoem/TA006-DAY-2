"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Armchair,
  Monitor,
  BookOpen,
  Package,
  SlidersHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { mockItems, conditions } from "@/lib/mock-data"
import { StarRating } from "@/components/star-rating"

type ListingItem = {
  id: string
  title: string
  price: number
  category: string
  condition: string
  description: string
  images: string[]
  seller: { name: string; rating: number; trustScore: number; college: string; avatar: string }
  location: string
  listedDate: string
  posted: string
}

const categoryIcons = {
  Furniture: Armchair,
  Electronics: Monitor,
  Books: BookOpen,
  Others: Package,
}

const allCategories = ["All", "Furniture", "Electronics", "Books", "Others"]

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [dbListings, setDbListings] = useState<ListingItem[]>([])

  // Load listings from localStorage (posted via the sell form)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("campus_cart_listings")
      if (!stored) return
      const raw: {
        id: string; title: string; price: number; category: string;
        condition: string; description?: string; images?: string[];
        location?: string; created_at?: string; seller_name?: string;
      }[] = JSON.parse(stored)
      if (!Array.isArray(raw)) return
      const mapped: ListingItem[] = raw.map((l) => ({
        id: l.id,
        title: l.title,
        price: l.price,
        category: l.category,
        condition: l.condition,
        description: l.description ?? "",
        images: l.images?.length
          ? l.images
          : ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"],
        seller: {
          name: l.seller_name ?? "Campus Seller",
          rating: 4.5,
          trustScore: 4.5,
          college: "PCE",
          avatar: (l.seller_name ?? "CS").split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
        },
        location: l.location ?? "Campus",
        listedDate: l.created_at ?? new Date().toISOString(),
        posted: l.created_at ?? new Date().toISOString(),
      }))
      setDbListings(mapped)
    } catch {
      // ignore errors
    }
  }, [])

  // Merge: real listings first, then mock items
  const allItems = [...dbListings, ...mockItems] as ListingItem[]

  const filtered = allItems.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory
    const matchPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1]
    const matchCondition =
      !selectedCondition || item.condition === selectedCondition
    return matchSearch && matchCategory && matchPrice && matchCondition
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Campus Marketplace
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse items from verified students at your campus
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => {
            const IconComponent =
              cat !== "All"
                ? categoryIcons[cat as keyof typeof categoryIcons]
                : null
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {cat}
              </button>
            )
          })}
        </div>

        {/* Extended filters */}
        <div
          className={cn(
            "flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:flex md:flex-row md:items-center",
            showFilters ? "flex" : "hidden md:flex"
          )}
        >
          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              step={500}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-xs font-medium text-muted-foreground">
              Condition:
            </span>
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() =>
                  setSelectedCondition(
                    selectedCondition === cond ? null : cond
                  )
                }
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  selectedCondition === cond
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filtered.length} item{filtered.length !== 1 && "s"} found
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/item/${item.id}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge
                variant="secondary"
                className="absolute left-3 top-3 bg-card/90 backdrop-blur-sm"
              >
                {item.category}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <span className="shrink-0 text-lg font-bold text-primary">
                  ₹{item.price}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground">{item.seller.name}</span>
                    <span className="text-muted-foreground/50">·</span>
                    <span>{item.seller.college}</span>
                  </div>
                  <StarRating score={item.seller.trustScore} showLabel={true} />
                </div>
                <span className="self-start rounded-full bg-muted px-2 py-0.5">
                  {item.condition}
                </span>
              </div>
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-sm"
                >
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No items found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
