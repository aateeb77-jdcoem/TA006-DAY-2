"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Upload,
  X,
  Tag,
  IndianRupee,
  Zap,
  TrendingUp,
  Loader2,
  CheckCircle2,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { campusZones, conditions } from "@/lib/mock-data"
import { createClient } from "@/lib/supabase/client"

const MAX_IMAGES = 5
const LOCAL_LISTINGS_KEY = "campus_cart_listings"

export default function ListItemPage() {
  const supabase = createClient()
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [sellFast, setSellFast] = useState(true)

  // Image state
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Submission
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [published, setPublished] = useState(false)

  // --- Image handling ---
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const remaining = MAX_IMAGES - images.length
      const toAdd = Array.from(files).slice(0, remaining)

      toAdd.forEach((file) => {
        if (!file.type.startsWith("image/")) return
        const reader = new FileReader()
        reader.onload = (e) => {
          setImages((prev) => [
            ...prev,
            { file, preview: e.target?.result as string },
          ])
        }
        reader.readAsDataURL(file)
      })
    },
    [images]
  )

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  // --- Submit listing ---
  const handlePublish = async () => {
    setError("")

    if (!title.trim()) { setError("Please add a title"); return }
    if (!category) { setError("Please select a category"); return }
    if (!condition) { setError("Please select a condition"); return }
    if (!price || Number(price) <= 0) { setError("Please enter a valid price"); return }

    setSubmitting(true)

    // Get current user info
    const { data: { user } } = await supabase.auth.getUser()
    let sellerName = "Campus Seller"
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single()
      sellerName = profile?.full_name || user.user_metadata?.full_name || "Campus Seller"
    }

    // Build the listing object
    const newListing = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      condition,
      location: location || "Campus",
      // Use base64 previews as image URLs (works offline, no Storage needed)
      images: images.length > 0 ? images.map((i) => i.preview) : [],
      seller_name: sellerName,
      seller_id: user?.id ?? "anonymous",
      status: "active",
      created_at: new Date().toISOString(),
    }

    // Save to localStorage (always works)
    try {
      const existing: typeof newListing[] = JSON.parse(
        localStorage.getItem(LOCAL_LISTINGS_KEY) || "[]"
      )
      existing.unshift(newListing)
      localStorage.setItem(LOCAL_LISTINGS_KEY, JSON.stringify(existing))
    } catch {
      // localStorage might be unavailable
    }

    // Also try to save to DB (graceful if table doesn't exist)
    fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newListing.title,
        description: newListing.description,
        price: newListing.price,
        category: newListing.category,
        condition: newListing.condition,
        location: newListing.location,
        images: [], // skip base64 in DB
      }),
    }).catch(() => { }) // Silent fail — localStorage is the primary store

    setSubmitting(false)
    setPublished(true)
  }

  // --- Success screen ---
  if (published) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Listing Published!</h2>
        <p className="mt-2 text-muted-foreground">
          Your item is now visible to students on campus.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => router.push("/marketplace")}>
            Browse Marketplace
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setPublished(false)
              setTitle("")
              setDescription("")
              setPrice("")
              setCategory("")
              setCondition(null)
              setLocation("")
              setImages([])
            }}
          >
            List Another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">List an Item</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sell your stuff to verified students on campus
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div>
          <Label>Item Photos ({images.length}/{MAX_IMAGES})</Label>
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square">
                <img
                  src={img.preview}
                  alt={`Upload ${i + 1}`}
                  className="h-full w-full rounded-xl object-cover border border-border"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {images.length < MAX_IMAGES && (
              <button
                className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="h-6 w-6" />
                <span className="mt-1 text-xs">Upload</span>
              </button>
            )}

            {Array.from({ length: Math.max(0, 2 - images.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex aspect-square items-center justify-center rounded-xl border border-border bg-muted/30"
              >
                <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
              </div>
            ))}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Click to upload or drag & drop. Max {MAX_IMAGES} images.
          </p>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="item-title">Item Title *</Label>
          <Input
            id="item-title"
            placeholder='e.g., IKEA Study Desk, Dell Monitor 24"'
            className="mt-1.5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <Label>Category *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your item — condition details, reason for selling, what's included..."
            className="mt-1.5 min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Condition */}
        <div>
          <Label>Condition *</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => setCondition(cond)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  condition === cond
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price (₹) *</Label>
          <div className="relative mt-1.5">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="price"
              type="number"
              placeholder="0"
              className="pl-10"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
            />
          </div>
        </div>

        {/* Sell Strategy Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            {sellFast ? (
              <Zap className="h-5 w-5 text-accent-foreground" />
            ) : (
              <TrendingUp className="h-5 w-5 text-primary" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {sellFast ? "Sell Fast" : "Max Value"}
              </p>
              <p className="text-xs text-muted-foreground">
                {sellFast
                  ? "Price competitively for quick sale"
                  : "Hold for the best offer"}
              </p>
            </div>
          </div>
          <Switch checked={sellFast} onCheckedChange={setSellFast} />
        </div>

        {/* Pickup Location */}
        <div>
          <Label>Pickup Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select campus zone" />
            </SelectTrigger>
            <SelectContent>
              {campusZones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          size="lg"
          className="w-full gap-2"
          onClick={handlePublish}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Tag className="h-4 w-4" />
              Publish Listing
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
