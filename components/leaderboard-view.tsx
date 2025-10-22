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
  const [selectedGameMode, setSelectedGameMode] = useState("ALL") // ✅ Default to ALL
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchPlayers = async () => {
      const allPlayers = await getAllPlayers()
      setPlayers(allPlayers)
      // ✅ Start by showing all players
      filterPlayers(allPlayers, "ALL", "")
    }
    fetchPlayers()
  }, [])

  const filterPlayers = (playerList: Player[], gameMode: string, query: string) => {
    let filtered = playerList

    if (query) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    } else if (gameMode !== "ALL") {
      filtered = filtered.filter((p) => {
        const stats = p.stats[gameMode as keyof typeof p.stats]
        return stats && stats.tier !== "N/A"
      })
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

  const getTierColor = (tier: string, mode?: string) => {
    if (tier === "N/A") return "text-muted-foreground"
    if (mode === "UHC") return "text-[#ffa500]"
    if (mode === "Crystal") return "text-[#c084fc]"
    if (mode === "Nethpot") return "text-[#ff4444]"
    if (mode === "SMP") return "text-[#ef4444]"
    if (mode === "Sword") return "text-yellow-400"
    if (tier.startsWith("HT")) return "text-primary"
    return "text-yellow-400"
  }

  const getTierBgColor = (tier: string, mode?: string) => {
    if (tier === "N/A") return "bg-secondary/50"
    if (mode === "UHC") return "bg-[#ff8c00]/10"
    if (mode === "Crystal") return "bg-[#9333ea]/10"
    if (mode === "Nethpot") return "bg-[#cc2222]/10"
    if (mode === "SMP") return "bg-[#dc2626]/10"
    if (mode === "Sword") return "bg-yellow-400/10"
    if (tier.startsWith("HT")) return "bg-primary/10"
    return "bg-yellow-400/10"
  }

  const getGameModeGlowClass = (mode: string) => {
    const glowMap: Record<string, string> = {
      UHC: "glow-orange",
      Crystal: "glow-purple",
      Nethpot: "glow-red",
      SMP: "glow-smp-red",
      Sword: "glow-orange",
    }
    return glowMap[mode] || "glow-orange"
  }

  return (
    <>
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
            {["SMP", "UHC", "Crystal", "Sword", "Nethpot", "ALL"].map((mode) => {
              const glowClass = getGameModeGlowClass(mode)
              const isSelected = selectedGameMode === mode
              const bgColorMap: Record<string, string> = {
                UHC: "bg-[#ff8c00]",
                Crystal: "bg-[#9333ea]",
                Nethpot: "bg-[#cc2222]",
                SMP: "bg-[#dc2626]",
                Sword: "bg-[#ff8c00]",
              }

              return (
                <Button
                  key={mode}
                  onClick={() => handleGameModeChange(mode)}
                  className={`whitespace-nowrap ${
                    isSelected && mode !== "ALL"
                      ? `${bgColorMap[mode]} hover:opacity-90 text-white ${glowClass}-hover`
                      : isSelected && mode === "ALL"
                      ? "bg-primary hover:bg-primary/80 text-white glow-orange-hover"
                      : "bg-secondary/50 hover:bg-secondary text-foreground"
                  }`}
                >
                  {mode}
                </Button>
              )
            })}
          </div>

          <div className="space-y-3">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player, index) => {
                const gameModeStats = player.stats[selectedGameMode as keyof typeof player.stats]
                const displayPoints = gameModeStats?.points || player.overallPoints
                const displayTier = gameModeStats?.tier || "N/A"

                return (
                  <button
                    key={player.id}
                    onClick={() => handlePlayerClick(player)}
                    className="w-full bg-card border border-border rounded-lg p-4 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-primary w-8 text-center">#{index + 1}</div>

                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                        <Image
                          src={`https://mc-heads.net/avatar/${player.name}/64`}
                          alt={player.name}
                          width={48}
                          height={48}
                          className="w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground truncate">{player.name}</h3>
                        <p className="text-sm text-muted-foreground">{displayPoints} pts</p>
                      </div>

                      <div className={`px-3 py-1 rounded-lg ${getTierBgColor(displayTier, selectedGameMode)}`}>
                        <p className={`font-bold text-sm ${getTierColor(displayTier, selectedGameMode)}`}>
                          {displayTier}
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

      <PlayerDetailModal player={selectedPlayer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
