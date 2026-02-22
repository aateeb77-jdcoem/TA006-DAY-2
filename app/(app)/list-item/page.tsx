"use client"

import { useState } from "react"
import {
  Upload,
  Image as ImageIcon,
  Tag,
  IndianRupee,
  Zap,
  TrendingUp,
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

export default function ListItemPage() {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [sellFast, setSellFast] = useState(true)
  const [published, setPublished] = useState(false)

  if (published) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Tag className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Listing Published!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your item is now visible to students on campus.
        </p>
        <Button className="mt-6" onClick={() => setPublished(false)}>
          List Another Item
        </Button>
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
        {/* Image Upload */}
        <div>
          <Label>Item Photos</Label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <button className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <Upload className="h-6 w-6" />
              <span className="mt-1 text-xs">Upload</span>
            </button>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-muted/30">
              <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-muted/30">
              <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Drag & drop or click to upload. Max 5 images.
          </p>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="item-title">Item Title</Label>
          <Input
            id="item-title"
            placeholder='e.g., IKEA Study Desk, Dell Monitor 24"'
            className="mt-1.5"
          />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your item, its condition, and why you're selling..."
            className="mt-1.5 min-h-[100px]"
          />
        </div>

        {/* Condition */}
        <div>
          <Label>Condition</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => setSelectedCondition(cond)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
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

        {/* Price */}
        <div>
          <Label htmlFor="price">Price (₹)</Label>
          <div className="relative mt-1.5">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="price" type="number" placeholder="0" className="pl-10" />
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary">
            <Tag className="h-3.5 w-3.5" />
            Suggested price range: ₹200 - ₹500
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
          <Select>
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
          className="w-full"
          onClick={() => setPublished(true)}
        >
          Publish Listing
        </Button>
      </div>
    </div>
  )
}
