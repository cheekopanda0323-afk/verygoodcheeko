"use client"

import { useState, useEffect } from "react"
import type { Player } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { getAllPlayers } from "@/lib/db"
import { Dragon3D } from "./dragon-3d"

export function TopPlayers() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getAllPlayers()
        const sorted = data
          .sort((a: Player, b: Player) => b.overallPoints - a.overallPoints)
          .slice(0, 5)

        setPlayers(sorted)
      } catch (error) {
        console.error("[v0] Error fetching top players:", error)
      }
    }

    fetchPlayers()
  }, [])

  return (
    <section
      id="ranking-section"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-background via-secondary/20 to-background relative"
    >
      <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="w-full md:w-96 h-80 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-4 relative z-10">
            <Dragon3D />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-16 animate-float-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1 sm:mb-2 text-glow-orange drop-shadow-lg">
            Overall Rankings
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Top 5 players by points</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {players.map((player, index) => (
            <Link key={player.id} href={`/${player.name}`} className="block">
              <div
                className="w-full bg-gradient-to-r from-card/40 to-secondary/30 backdrop-blur-lg border border-primary/20 rounded-lg p-3 sm:p-4 md:p-6 hover:border-primary hover:from-card/60 hover:to-secondary/40 transition-all duration-300 cursor-pointer text-left group shine-effect-players glow-orange-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-orange border border-primary/50 shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl font-black text-white">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 border-primary/50 glow-orange flex-shrink-0">
                      <Image
                        src={`https://visage.surgeplay.com/bust/512/${player.name}`}
                        alt={player.name}
                        width={64}
                        height={64}
                        className="w-full h-full"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base md:text-lg text-foreground uppercase truncate">
                        {player.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {player.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-primary text-glow-orange">
                      {player.overallPoints}
                    </p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="mt-8 sm:mt-10 md:mt-12 flex justify-center animate-float-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Link href="/leaderboard">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-black text-sm sm:text-base rounded-lg transition-all duration-300 glow-orange-hover border border-primary/50 shadow-lg">
              View All Leaderboard
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
