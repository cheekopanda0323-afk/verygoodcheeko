"use client"

import { useState, useEffect } from "react"
import { getAllPlayers } from "@/lib/db"
import type { Player } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LeaderboardView() {
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGameMode, setSelectedGameMode] = useState("ALL")
  
  useEffect(() => {
    const fetchPlayers = async () => {
      const allPlayers = await getAllPlayers()
      setPlayers(allPlayers)
      filterPlayers(allPlayers, "ALL", "")
    }
    fetchPlayers()
  }, [])

  const getTierRank = (tier: string): number => {
    const tierRanks: Record<string, number> = {
      HT1: 100, LT1: 99, HT2: 98, LT2: 97,
      HT3: 96, LT3: 95, HT4: 94, LT4: 93,
      HT5: 92, LT5: 91, "N/A": 0,
    }
    return tierRanks[tier] || 0
  }

  const filterPlayers = (playerList: Player[], gameMode: string, query: string) => {
    let filtered = playerList

    if (query) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    }

    if (gameMode !== "ALL") {
      filtered = filtered.filter((p) => {
        const stats = p.stats[gameMode as keyof typeof p.stats]
        return stats && stats.tier !== "N/A"
      })
    }

    if (gameMode === "ALL") {
      filtered.sort((a, b) => b.overallPoints - a.overallPoints)
    } else {
      filtered.sort((a, b) => {
        const statsA = a.stats[gameMode as keyof typeof a.stats]
        const statsB = b.stats[gameMode as keyof typeof b.stats]

        const pointsA = statsA?.points || 0
        const pointsB = statsB?.points || 0

        if (pointsB !== pointsA) return pointsB - pointsA

        return getTierRank(statsB?.tier || "N/A") - getTierRank(statsA?.tier || "N/A")
      })
    }

    setFilteredPlayers(filtered)
  }

  const handleGameModeChange = (mode: string) => {
    setSelectedGameMode(mode)
    filterPlayers(players, mode, searchQuery)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterPlayers(players, selectedGameMode, query)
  }

  const getTopPlayerStyle = (index: number) => {
    if (index === 0) {
      return {
        glow: "shadow-lg shadow-[#ffd700]/50 border-[#ffd700]/50",
        medal: "text-[#ffd700]",
        background: "from-[#ffd700]/15 to-[#ff002b]/10",
      }
    }
    if (index === 1) {
      return {
        glow: "shadow-md shadow-[#c0c0c0]/40 border-[#c0c0c0]/40",
        medal: "text-[#c0c0c0]",
        background: "from-[#c0c0c0]/10 to-[#ff002b]/10",
      }
    }
    if (index === 2) {
      return {
        glow: "shadow-sm shadow-[#cd7f32]/30 border-[#cd7f32]/30",
        medal: "text-[#cd7f32]",
        background: "from-[#cd7f32]/10 to-[#ff002b]/10",
      }
    }
    return {
      glow: "",
      medal: "text-primary",
      background: "from-[#ff002b]/5 to-transparent",
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-glow-red mb-2">AliveTierList</h1>
          <p className="text-xl text-muted-foreground">Minecraft Player Rankings</p>
        </div>

        <div className="mb-8">
          <Input
            placeholder="Search player IGN..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {["SMP", "UHC", "Crystal", "Sword", "Nethpot", "DiaSMP", "Mace PvP", "AxePvP", "ALL"].map((mode) => {
            return (
              <Button
                key={mode}
                onClick={() => handleGameModeChange(mode)}
                className={`whitespace-nowrap ${
                  selectedGameMode === mode
                    ? "bg-primary text-white"
                    : "bg-secondary/50 hover:bg-secondary text-foreground"
                }`}
              >
                {mode}
              </Button>
            )
          })}
        </div>

        <div className="space-y-2">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, index) => {
              const gameModeStats = player.stats[selectedGameMode as keyof typeof player.stats]
              const displayValue = selectedGameMode === "ALL" ? player.overallPoints : gameModeStats?.tier || "N/A"
              const displayLabel = selectedGameMode === "ALL" ? "Points" : "Tier"
              const topStyle = getTopPlayerStyle(index)

              const [imgSrc, setImgSrc] = useState(
                `https://visage.surgeplay.com/bust/512/${player.name}`
              )

              return (
                <button
                  key={player.id}
                  onClick={() => (window.location.href = `/${player.name}`)}
                  className={`w-full bg-gradient-to-r ${topStyle.background} backdrop-blur-xl border border-primary/20 rounded-xl p-4 hover:scale-102 transition-all cursor-pointer text-left group ${topStyle.glow}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold w-8 text-center ${topStyle.medal}`}>
                      #{index + 1}
                    </div>

                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-primary/40">
                      <Image
                        src={imgSrc}
                        alt={player.name}
                        width={48}
                        height={48}
                        onError={() =>
                          setImgSrc("https://visage.surgeplay.com/bust/512/Steve")
                        }
                        className="w-full h-full"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {displayLabel}: {displayValue}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No players found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
