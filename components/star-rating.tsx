// Reusable star rating component for seller authenticity score (out of 5)
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
    score: number        // e.g. 4.8
    max?: number         // default 5
    size?: "sm" | "md"
    showLabel?: boolean  // show "4.8 / 5" label
    className?: string
}

export function StarRating({
    score,
    max = 5,
    size = "sm",
    showLabel = true,
    className,
}: StarRatingProps) {
    const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5"
    const filled = Math.floor(score)
    const hasHalf = score - filled >= 0.25 && score - filled < 0.75
    const empty = max - filled - (hasHalf ? 1 : 0)

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex items-center gap-0.5">
                {/* Filled stars */}
                {Array.from({ length: filled }).map((_, i) => (
                    <Star key={`f${i}`} className={cn(starSize, "fill-amber-400 text-amber-400")} />
                ))}
                {/* Half star */}
                {hasHalf && (
                    <span className="relative inline-block">
                        <Star className={cn(starSize, "text-muted-foreground/30")} />
                        <span className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className={cn(starSize, "fill-amber-400 text-amber-400")} />
                        </span>
                    </span>
                )}
                {/* Empty stars */}
                {Array.from({ length: empty }).map((_, i) => (
                    <Star key={`e${i}`} className={cn(starSize, "text-muted-foreground/30")} />
                ))}
            </div>
            {showLabel && (
                <span className="text-xs font-medium text-foreground">
                    {score.toFixed(1)}
                </span>
            )}
        </div>
    )
}

// Compact trust badge: shows star + score + "Verified" label
export function TrustBadge({ score, className }: { score: number; className?: string }) {
    const level =
        score >= 4.7 ? { label: "Highly Trusted", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" }
            : score >= 4.3 ? { label: "Trusted", color: "text-primary bg-primary/10" }
                : { label: "New Seller", color: "text-muted-foreground bg-muted" }

    return (
        <div className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", level.color, className)}>
            <Star className="h-3 w-3 fill-current" />
            <span>{score.toFixed(1)}</span>
            <span className="opacity-70">· {level.label}</span>
        </div>
    )
}
