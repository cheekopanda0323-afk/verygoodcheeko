"use client"

import { useState } from "react"
import { searchPlayers } from "@/lib/db"
import type { Player } from "@/lib/types"
import Image from "next/image"
import { GamemodeIcon } from "./gamemode-icons"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Player[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchPlayers(query)
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const handlePlayerClick = (player: Player) => {
    window.location.href = `/${player.name}`
  }

  const gamemodes = [
    { name: "UHC", description: "Ultra Hardcore Combat" },
    { name: "Crystal", description: "Crystal PvP" },
    { name: "Sword", description: "Sword Fighting" },
    { name: "Nethpot", description: "Nether Potions" },
    { name: "SMP", description: "Survival Multiplayer" },
    { name: "DiaSMP", description: "Diamond SMP" },
    { name: "Mace PvP", description: "Mace Combat" },
    { name: "AxePvP", description: "Axe Combat" },
  ]

  return (
    <>
      <section className="min-h-screen bg-background pt-20 sm:pt-24 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10 w-full">
          <div className="space-y-2 sm:space-y-4 animate-float-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tight text-glow-orange drop-shadow-xl">
              AliveTierList
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium">
              Minecraft Player Rankings
            </p>
          </div>

          <div className="pt-2 sm:pt-4 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search player IGN..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-card/60 backdrop-blur-sm border border-primary/30 rounded-lg text-sm sm:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all glow-orange-hover"
              />

              {/* Search results dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((player) => (
                    <button
                      key={player.id}
                      onClick={() => handlePlayerClick(player)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 hover:bg-secondary/50 transition-colors text-left flex items-center gap-2 sm:gap-3 border-b border-border last:border-b-0"
                    >
                      <Image
                        src={`https://visage.surgeplay.com/bust/512/${player.name}`}
                        alt={player.name}
                        width={32}
                        height={32}
                        className="rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">{player.name}</p>
                        <p className="text-xs text-muted-foreground">{player.overallPoints} points</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {showResults && searchResults.length === 0 && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border rounded-lg p-3 sm:p-4 text-center text-sm text-muted-foreground">
                  No players found
                </div>
              )}
            </div>
          </div>

          <div
            className="pt-4 sm:pt-8 bg-gradient-to-br from-card/40 to-secondary/20 backdrop-blur-xl border border-primary/20 rounded-xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto glow-orange animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-left">
                <h2 className="text-lg sm:text-2xl font-black text-foreground mb-1 sm:mb-2">
                  Welcome to AliveTierList
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  The ultimate Minecraft player ranking system. Track your performance across multiple gamemodes and
                  compete with the best players in the community.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-8 max-w-2xl mx-auto">
            <div
              className="bg-gradient-to-br from-card/40 to-secondary/20 backdrop-blur-lg border border-primary/20 rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all hover:border-primary hover:glow-orange animate-scale-in"
              style={{ animationDelay: "0.5s" }}
            >
              <p className="font-black text-sm sm:text-base text-foreground mb-1">7 Gamemodes</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Compete across SMP, UHC, NETH, Crystal, Sword, DiaSMP & Mace
              </p>
            </div>
            <div
              className="bg-gradient-to-br from-card/40 to-secondary/20 backdrop-blur-lg border border-primary/20 rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all hover:border-primary hover:glow-orange animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="font-black text-sm sm:text-base text-foreground mb-1">Global Rankings</p>
              <p className="text-xs sm:text-sm text-muted-foreground">See where you stand against other players</p>
            </div>
            <div
              className="bg-gradient-to-br from-card/40 to-secondary/20 backdrop-blur-lg border border-primary/20 rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all hover:border-primary hover:glow-orange animate-scale-in"
              style={{ animationDelay: "0.7s" }}
            >
              <p className="font-black text-sm sm:text-base text-foreground mb-1">Real-time Updates</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Rankings update instantly as players compete</p>
            </div>
          </div>

          <div className="pt-8 sm:pt-12 md:pt-16 max-w-4xl mx-auto w-full">
            <h2 className="text-2xl sm:text-3xl font-black text-primary text-glow-orange mb-6 sm:mb-8">
              Available Gamemodes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {gamemodes.map((gamemode, index) => (
                <div
                  key={gamemode.name}
                  className="bg-gradient-to-br from-card/40 to-secondary/20 backdrop-blur-lg border border-primary/30 rounded-lg p-3 sm:p-4 text-center transition-all duration-300 hover:border-primary hover:from-card/60 hover:to-secondary/40 hover:shadow-lg hover:shadow-primary/20 glow-orange-hover animate-scale-in group"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="text-primary mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <GamemodeIcon name={gamemode.name} />
                  </div>
                  <p className="font-black text-xs sm:text-sm text-foreground mb-1">{gamemode.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{gamemode.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
