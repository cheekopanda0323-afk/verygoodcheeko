"use client"

import { useState, useEffect } from "react"
import { getAllPlayers } from "@/lib/db"
import type { Player } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayerDetailModal } from "./player-detail-modal"

export function LeaderboardView() {
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGameMode, setSelectedGameMode] = useState("ALL")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const allPlayers = getAllPlayers()
    setPlayers(allPlayers)
    filterPlayers(allPlayers, "ALL", searchQuery)
  }, [])

  const filterPlayers = (playerList: Player[], gameMode: string, query: string) => {
    let filtered = playerList

    if (query) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    } else {
      if (gameMode !== "ALL") {
        filtered = filtered.filter((p) => {
          const stats = p.stats[gameMode as keyof typeof p.stats]
          return stats && stats.tier !== "N/A"
        })
      }
    }

    filtered.sort((a, b) => b.overallPoints - a.overallPoints)
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

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const getRegionBgColor = (region: string) => {
    const regionMap: Record<string, string> = {
      NA: "bg-[#dc2626]",
      EU: "bg-[#16a34a]",
      AS: "bg-[#2563eb]",
      OTHER: "bg-[#7c3aed]",
    }
    return regionMap[region] || "bg-secondary"
  }

  const getGameModeIcon = (mode: string) => {
    const iconMap: Record<string, string> = {
      UHC: "⚔️",
      Crystal: "💎",
      Sword: "🗡️",
      Nethpot: "🔥",
      SMP: "❤️",
    }
    return iconMap[mode] || "•"
  }

  const getGameModeColor = (mode: string) => {
    const colorMap: Record<string, string> = {
      UHC: "text-[#ffa500]",
      Crystal: "text-[#c084fc]",
      Nethpot: "text-[#ff4444]",
      SMP: "text-[#ef4444]",
      Sword: "text-[#ffa500]",
    }
    return colorMap[mode] || "text-foreground"
  }

  const getGameModeBgColor = (mode: string) => {
    const bgMap: Record<string, string> = {
      UHC: "bg-[#ff8c00]/10",
      Crystal: "bg-[#9333ea]/10",
      Nethpot: "bg-[#cc2222]/10",
      SMP: "bg-[#dc2626]/10",
      Sword: "bg-[#ff8c00]/10",
    }
    return bgMap[mode] || "bg-secondary/10"
  }

  return (
    <>
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
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
            {["ALL", "SMP", "UHC", "Crystal", "Sword", "Nethpot"].map((mode) => {
              const isSelected = selectedGameMode === mode
              const bgColorMap: Record<string, string> = {
                UHC: "bg-[#ff8c00]",
                Crystal: "bg-[#9333ea]",
                Nethpot: "bg-[#cc2222]",
                SMP: "bg-[#dc2626]",
                Sword: "bg-[#ff8c00]",
                ALL: "bg-primary",
              }

              return (
                <Button
                  key={mode}
                  onClick={() => handleGameModeChange(mode)}
                  className={`whitespace-nowrap ${
                    isSelected
                      ? `${bgColorMap[mode]} hover:opacity-90 text-white`
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
                const rankBgColor =
                  ["bg-yellow-500", "bg-gray-400", "bg-orange-600", "bg-slate-600", "bg-slate-700"][index] ||
                  "bg-slate-800"

                return (
                  <button
                    key={player.id}
                    onClick={() => handlePlayerClick(player)}
                    className="w-full bg-card border border-border rounded-lg p-4 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div
                        className={`${rankBgColor} text-white font-bold text-2xl w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        {index + 1}
                      </div>

                      {/* Player Avatar */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-border flex-shrink-0">
                        <Image
                          src={`https://mc-heads.net/avatar/${player.name}/64`}
                          alt={player.name}
                          width={64}
                          height={64}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Player Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground truncate">{player.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedGameMode !== "ALL"
                            ? player.stats[selectedGameMode as keyof typeof player.stats]?.points ||
                              player.overallPoints
                            : player.overallPoints}{" "}
                          pts
                        </p>
                      </div>

                      {/* Region Badge */}
                      <div
                        className={`${getRegionBgColor(player.region)} text-white font-bold px-3 py-1 rounded-lg flex-shrink-0`}
                      >
                        {player.region}
                      </div>

                      {/* Game Mode Tiers */}
                      <div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
                        {Object.entries(player.stats).map(([mode, stats]) => (
                          <div
                            key={mode}
                            className={`flex flex-col items-center gap-1 ${getGameModeBgColor(mode)} px-2 py-1 rounded-lg`}
                          >
                            <span className={`text-sm font-bold ${getGameModeColor(mode)}`}>{stats.tier}</span>
                          </div>
                        ))}
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

      <PlayerDetailModal player={selectedPlayer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
