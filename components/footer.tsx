import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <ShoppingBag className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                CampusCart
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A verified, scam-free marketplace built exclusively for college
              students.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Marketplace
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/marketplace" className="transition-colors hover:text-foreground">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link href="/list-item" className="transition-colors hover:text-foreground">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  About
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Contact
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Privacy
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Support
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Help Center
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Safety Tips
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Community Guidelines
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {'CampusCart 2026. All rights reserved.'}
          </p>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            Hackathon Demo
          </div>
        </div>
      </div>
    </footer>
  )
}
