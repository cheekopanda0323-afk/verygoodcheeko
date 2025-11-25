"use client"

import { useState, useEffect } from "react"
import { getAllPlayers } from "@/lib/db"
import type { Player } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

// --- 1. POPUP / MODAL COMPONENT ---
interface PlayerModalProps {
  player: Player | null
  isOpen: boolean
  onClose: () => void
}

function PlayerDetailModal({ player, isOpen, onClose }: PlayerModalProps) {
  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    if (player) {
      setImgSrc(`https://visage.surgeplay.com/bust/512/${player.name}`)
    }
  }, [player])

  if (!isOpen || !player) return null

  // Cracked Players Image Fix
  const handleImageError = () => {
    const steveUUID = "c06f89064c8a49119c29ea1dbd1aab82"
    const alexUUID = "606e2ff0ed7748429d6ce1d3321c7838"
    const useSteve = player.name.length % 2 === 0
    setImgSrc(`https://visage.surgeplay.com/bust/512/${useSteve ? steveUUID : alexUUID}`)
  }

  const getTierColor = (tier: string, mode?: string) => {
    if (tier === "N/A") return "text-muted-foreground"
    if (mode === "UHC") return "text-[#ffa500]"
    if (mode === "Crystal") return "text-[#c084fc]"
    if (mode === "Nethpot") return "text-[#ff4444]"
    if (mode === "SMP") return "text-[#ef4444]"
    if (mode === "Sword") return "text-yellow-400"
    if (mode === "DiaSMP") return "text-[#00bfff]"
    if (mode === "Mace PvP") return "text-[#ffd700]"
    if (mode === "AxePvP") return "text-[#ff6b35]"
    if (tier.startsWith("HT")) return "text-primary"
    return "text-yellow-400"
  }

  const getTierBgColor = (tier: string, mode?: string) => {
    if (tier === "N/A") return "bg-secondary/50 border-secondary"
    if (mode === "UHC") return "bg-[#ff8c00]/10 border-[#ff8c00]/50"
    if (mode === "Crystal") return "bg-[#9333ea]/10 border-[#9333ea]/50"
    if (mode === "Nethpot") return "bg-[#cc2222]/10 border-[#cc2222]/50"
    if (mode === "SMP") return "bg-[#dc2626]/10 border-[#dc2626]/50"
    if (mode === "Sword") return "bg-yellow-400/10 border-yellow-400/50"
    if (mode === "DiaSMP") return "bg-[#00bfff]/10 border-[#00bfff]/50"
    if (mode === "Mace PvP") return "bg-[#ffd700]/10 border-[#ffd700]/50"
    if (mode === "AxePvP") return "bg-[#ff6b35]/10 border-[#ff6b35]/50"
    if (tier.startsWith("HT")) return "bg-primary/10 border-primary/50"
    return "bg-yellow-400/10 border-yellow-400/50"
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-card border border-primary/20 rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Click inside won't close
      >
        {/* CROSS BUTTON (Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
        </button>

        {/* Player Info */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative w-28 h-28 rounded-lg overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
             {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={player.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  unoptimized
                />
              )}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold">{player.name}</h2>
            <p className="text-muted-foreground">Stats Overview</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className="bg-secondary/30 p-3 rounded-lg border border-border text-center">
             <span className="text-xs text-muted-foreground uppercase">Overall Points</span>
             <p className="text-2xl font-bold text-primary">{player.overallPoints}</p>
           </div>
           <div className="bg-secondary/30 p-3 rounded-lg border border-border text-center">
             <span className="text-xs text-muted-foreground uppercase">Rank</span>
             <p className="text-2xl font-bold text-foreground">Active</p>
           </div>
        </div>

        {/* Tiers List */}
        <h3 className="text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Mode Tiers</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(player.stats).map(([mode, stats]) => (
            <div
              key={mode}
              className={`flex flex-col items-center justify-center p-2 rounded-md border ${getTierBgColor(stats.tier, mode)}`}
            >
              <span className="text-[10px] font-semibold opacity-70 mb-1">{mode}</span>
              <span className={`text-sm font-bold ${getTierColor(stats.tier, mode)}`}>
                {stats.tier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 2. MAIN LEADERBOARD COMPONENT ---

// Helper for Avatar in List
const PlayerAvatarList = ({ name }: { name: string }) => {
  const [src, setSrc] = useState(`https://visage.surgeplay.com/bust/512/${name}`)
  const handleOnError = () => {
    const steveUUID = "c06f89064c8a49119c29ea1dbd1aab82"
    const alexUUID = "606e2ff0ed7748429d6ce1d3321c7838"
    const useSteve = name.length % 2 === 0
    setSrc(`https://visage.surgeplay.com/bust/512/${useSteve ? steveUUID : alexUUID}`)
  }
  return (
    <Image src={src} alt={name} width={48} height={48} className="w-full h-full object-cover" onError={handleOnError} unoptimized />
  )
}

export function LeaderboardView() {
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGameMode, setSelectedGameMode] = useState("ALL")
  
  // NEW STATE: Selected Player for Modal
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

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
      HT1: 100, LT1: 99, HT2: 98, LT2: 97, HT3: 96, LT3: 95,
      HT4: 94, LT4: 93, HT5: 92, LT5: 91, "N/A": 0,
    }
    return tierRanks[tier] || 0
  }

  const filterPlayers = (playerList: Player[], gameMode: string, query: string) => {
    let filtered = playerList
    if (query) filtered = filtered.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

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
        
        const tierRankA = getTierRank(statsA?.tier || "N/A")
        const tierRankB = getTierRank(statsB?.tier || "N/A")
        return tierRankB - tierRankA
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

  // MODIFIED: Open Modal instead of Window Location
  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
  }

  const getGameModeGlowClass = (mode: string) => {
    const glowMap: Record<string, string> = {
      UHC: "glow-orange", Crystal: "glow-purple", Nethpot: "glow-red",
      SMP: "glow-smp-red", Sword: "glow-orange", DiaSMP: "glow-cyan",
      "Mace PvP": "glow-yellow", AxePvP: "glow-orange",
    }
    return glowMap[mode] || "glow-orange"
  }

  const getTopPlayerStyle = (index: number) => {
    if (index === 0) return { glow: "shadow-lg shadow-[#ffd700]/50 border-[#ffd700]/50", medal: "text-[#ffd700]", background: "from-[#ffd700]/15 to-[#ff002b]/10" }
    if (index === 1) return { glow: "shadow-md shadow-[#c0c0c0]/40 border-[#c0c0c0]/40", medal: "text-[#c0c0c0]", background: "from-[#c0c0c0]/10 to-[#ff002b]/10" }
    if (index === 2) return { glow: "shadow-sm shadow-[#cd7f32]/30 border-[#cd7f32]/30", medal: "text-[#cd7f32]", background: "from-[#cd7f32]/10 to-[#ff002b]/10" }
    return { glow: "", medal: "text-primary", background: "from-[#ff002b]/5 to-transparent" }
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
            {["SMP", "UHC", "Crystal", "Sword", "Nethpot", "DiaSMP", "Mace PvP", "AxePvP", "ALL"].map((mode) => {
              const glowClass = getGameModeGlowClass(mode)
              const isSelected = selectedGameMode === mode
              const bgColorMap: Record<string, string> = {
                UHC: "bg-[#ff8c00]", Crystal: "bg-[#9333ea]", Nethpot: "bg-[#cc2222]",
                SMP: "bg-[#dc2626]", Sword: "bg-[#ff8c00]", DiaSMP: "bg-[#00bfff]",
                "Mace PvP": "bg-[#ffd700]", AxePvP: "bg-[#ff6b35]",
              }

              return (
                <Button
                  key={mode}
                  onClick={() => handleGameModeChange(mode)}
                  className={`whitespace-nowrap ${isSelected && mode !== "ALL"
                      ? `${bgColorMap[mode]} hover:opacity-90 text-white ${glowClass}-hover`
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
                const topPlayerStyle = getTopPlayerStyle(index)

                return (
                  <button
                    key={player.id}
                    onClick={() => handlePlayerClick(player)}
                    className={`w-full bg-gradient-to-r ${topPlayerStyle.background} backdrop-blur-xl border border-primary/20 rounded-xl p-4 hover:from-primary/20 hover:to-primary/10 transition-all hover:scale-102 duration-200 cursor-pointer text-left group ${topPlayerStyle.glow}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold w-8 text-center font-extrabold ${topPlayerStyle.medal}`}>
                        #{index + 1}
                      </div>

                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-primary/40 flex-shrink-0 group-hover:border-primary transition-colors">
                        <PlayerAvatarList name={player.name} />
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

      {/* MODAL IS HERE */}
      <PlayerDetailModal 
        player={selectedPlayer} 
        isOpen={!!selectedPlayer} 
        onClose={() => setSelectedPlayer(null)} 
      />
    </>
  )
    }
      
