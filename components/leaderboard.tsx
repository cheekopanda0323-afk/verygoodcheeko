"use client"

import { useState, useEffect } from "react"
import { getAllPlayers, searchPlayers } from "@/lib/db"
import type { Player } from "@/lib/types"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])

  useEffect(() => {
    const allPlayers = getAllPlayers().sort((a, b) => b.points - a.points)
    setPlayers(allPlayers)
    setFilteredPlayers(allPlayers)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredPlayers(searchPlayers(searchQuery).sort((a, b) => b.points - a.points))
    } else {
      setFilteredPlayers(players)
    }
  }, [searchQuery, players])

  const getTierColor = (tier: string) => {
    if (tier.startsWith("HT")) return "text-primary"
    return "text-yellow-400"
  }

  return (
    <section className="py-12 px-4 sm:py-20 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-glow-red mb-4 sm:mb-6 text-center sm:text-left">
            Leaderboard
          </h2>
          <Input
            placeholder="Search player by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary w-full sm:w-1/2"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground font-semibold text-sm sm:text-base">Rank</th>
                <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground font-semibold text-sm sm:text-base">Player</th>
                <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground font-semibold text-sm sm:text-base">Tier</th>
                <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground font-semibold text-sm sm:text-base">Points</th>
                <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-muted-foreground font-semibold text-sm sm:text-base">Game Mode</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr key={player.id} className="border-b border-border hover:bg-card/50 transition-colors">
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-primary font-bold text-sm sm:text-base">#{index + 1}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden border border-primary/30">
                        <Image
                          src={`https://mc-heads.net/avatar/${player.name}/32`}
                          alt={player.name}
                          width={32}
                          height={32}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{player.name}</span>
                    </div>
                  </td>
                  <td className={`py-2 px-2 sm:py-4 sm:px-4 font-bold text-sm sm:text-base ${getTierColor(player.tier)}`}>{player.tier}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-primary font-bold text-sm sm:text-base">{player.points}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-muted-foreground text-sm sm:text-base">{player.gameMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-base sm:text-lg">No players found</p>
          </div>
        )}
      </div>
    </section>
  )
}
