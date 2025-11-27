"use client"

import { useState, useEffect, useCallback } from "react" // Import useCallback
import { getAllPlayers } from "@/lib/db"
import type { Player } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw } from "lucide-react" // Install lucide-react if you haven't, or use text

// ... PlayerAvatar Component (Keep as is) ...
const PlayerAvatar = ({ name, className }: { name: string; className?: string }) => {
  const [src, setSrc] = useState(`https://visage.surgeplay.com/bust/512/${name}`)

  const handleOnError = () => {
    const steveUUID = "c06f89064c8a49119c29ea1dbd1aab82"
    const alexUUID = "606e2ff0ed7748429d6ce1d3321c7838"
    const useSteve = name.length % 2 === 0
    setSrc(`https://visage.surgeplay.com/bust/512/${useSteve ? steveUUID : alexUUID}`)
  }

  return (
    <Image
      src={src}
      alt={name}
      width={48}
      height={48}
      className={className}
      onError={handleOnError}
      unoptimized
    />
  )
}

export function LeaderboardView() {
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGameMode, setSelectedGameMode] = useState("ALL")
  const [isRefreshing, setIsRefreshing] = useState(false) // State for loading spinner

  // 1. Memoize getTierRank to prevent unnecessary re-renders
  const getTierRank = (tier: string): number => {
    const tierRanks: Record<string, number> = {
      HT1: 100, LT1: 99, HT2: 98, LT2: 97, HT3: 96, LT3: 95,
      HT4: 94, LT4: 93, HT5: 92, LT5: 91, "N/A": 0,
    }
    return tierRanks[tier] || 0
  }

  // 2. Move filter logic into a useCallback so we can reuse it easily
  const applyFilters = useCallback((playerList: Player[], gameMode: string, query: string) => {
    let filtered = [...playerList] // Create a copy

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

        if (pointsB !== pointsA) {
          return pointsB - pointsA
        }

        const tierRankA = getTierRank(statsA?.tier || "N/A")
        const tierRankB = getTierRank(statsB?.tier || "N/A")
        return tierRankB - tierRankA
      })
    }
    setFilteredPlayers(filtered)
  }, []) // No dependencies needed for internal helpers if they are pure

  // 3. Create a dedicated fetch function
  const fetchPlayers = async () => {
    setIsRefreshing(true)
    try {
      const allPlayers = await getAllPlayers()
      setPlayers(allPlayers)
      // Apply filters immediately after fetching with current state
      applyFilters(allPlayers, selectedGameMode, searchQuery)
    } catch (error) {
      console.error("Failed to fetch players:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // 4. Initial Fetch
  useEffect(() => {
    fetchPlayers()
  }, []) // Empty dependency array ensures this runs once on mount

  // 5. Re-run filters when UI state changes (but don't re-fetch DB)
  useEffect(() => {
    applyFilters(players, selectedGameMode, searchQuery)
  }, [selectedGameMode, searchQuery, players, applyFilters])

  const handleGameModeChange = (mode: string) => {
    setSelectedGameMode(mode)
    // Filter effect will handle the rest
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Filter effect will handle the rest
  }

  // ... (keep helper functions like getGameModeGlowClass, getTopPlayerStyle, handlePlayerClick) ...
  const handlePlayerClick = (player: Player) => {
    window.location.href = `/${player.name}`
  }

  const getGameModeGlowClass = (mode: string) => {
    // ... (Your existing code)
    const glowMap: Record<string, string> = {
      UHC: "glow-orange",
      Crystal: "glow-purple",
      Nethpot: "glow-red",
      SMP: "glow-smp-red",
      Sword: "glow-orange",
      DiaSMP: "glow-cyan",
      "Mace PvP": "glow-yellow",
      AxePvP: "glow-orange",
    }
    return glowMap[mode] || "glow-orange"
  }

  const getTopPlayerStyle = (index: number) => {
    // ... (Your existing code)
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
    <>
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-glow-red mb-2">AliveTierList</h1>
              <p className="text-xl text-muted-foreground">Minecraft Player Rankings</p>
            </div>
            {/* Added Refresh Button */}
            <Button 
              onClick={fetchPlayers} 
              disabled={isRefreshing}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>

          <div className="mb-8">
            <Input
              placeholder="Search player IGN..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* ... Rest of your JSX (Buttons and Map) ... */}
          
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {["SMP", "UHC", "Crystal", "Sword", "Nethpot", "DiaSMP", "Mace PvP", "AxePvP", "ALL"].map((mode) => {
              const glowClass = getGameModeGlowClass(mode)
              const isSelected = selectedGameMode === mode
              const bgColorMap: Record<string, string> = {
                UHC: "bg-[#ff8c00]",
                Crystal: "bg-[#9333ea]",
                Nethpot: "bg-[#cc2222]",
                SMP: "bg-[#dc2626]",
                Sword: "bg-[#ff8c00]",
                DiaSMP: "bg-[#00bfff]",
                "Mace PvP": "bg-[#ffd700]",
                AxePvP: "bg-[#ff6b35]",
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
                        <PlayerAvatar
                          name={player.name}
                          className="w-full h-full object-cover"
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
    </>
  )
}
