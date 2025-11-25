"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md border-b border-border z-50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-orange border border-primary/50">
            <span className="text-sm sm:text-lg font-bold text-white drop-shadow-lg">⚔</span>
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-lg sm:text-xl font-bold text-glow-orange">AliveTierList</span>
            <span className="text-xs text-muted-foreground">Tier System</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
            Home
          </Link>
          <Link
            href="/leaderboard"
            className="text-foreground hover:text-primary transition-colors font-medium text-sm"
          >
            Rankings
          </Link>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-orange-hover text-sm border border-primary/50 text-white font-bold"
          >
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </Button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
          <div className="w-5 h-0.5 bg-foreground"></div>
          <div className="w-5 h-0.5 bg-foreground"></div>
          <div className="w-5 h-0.5 bg-foreground"></div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-sm border-t border-border">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" className="block text-foreground hover:text-primary transition-colors font-medium text-sm">
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="block text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              Rankings
            </Link>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-orange-hover text-sm border border-primary/50 text-white font-bold"
            >
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
