"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Player } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { GAME_MODES } from "@/lib/types"
import { getAllPlayers } from "@/lib/db"

export default function PlayerPage() {
  const params = useParams()
  const playerName = params.playerName as string
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const players = await getAllPlayers()
        const foundPlayer = players.find((p) => p.name.toLowerCase() === playerName.toLowerCase())
        setPlayer(foundPlayer || null)
      } catch (error) {
        console.error("Error fetching player:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [playerName])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Player not found</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const playerImageUrl = imageError
    ? `https://mc-heads.net/avatar/${player.name}/128`
    : `https://visage.surgeplay.com/bust/512/${player.name}`

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
    if (mode === "Sword") return "bg-yellow-440/10 border-yellow-400/50"
    if (mode === "DiaSMP") return "bg-[#00bfff]/10 border-[#00bfff]/50"
    if (mode === "Mace PvP") return "bg-[#ffd700]/10 border-[#ffd700]/50"
    if (mode === "AxePvP") return "bg-[#ff6b35]/10 border-[#ff6b35]/50"
    if (tier.startsWith("HT")) return "bg-primary/10 border-primary/50"
    return "bg-yellow-400/10 border-yellow-400/50"
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-card border border-primary/30 rounded-lg p-6">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src={playerImageUrl || "/placeholder.svg"}
                alt={player.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">{player.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{player.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-sm">
                    1
                  </div>
                  <span className="text-xs text-muted-foreground">POSITION</span>
                </div>
                <p className="text-xs text-muted-foreground">OVERALL</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="text-2xl font-bold text-primary mb-1">{player.overallPoints}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-sm font-bold text-foreground mb-3">TIERS</h3>
              <div className="grid grid-cols-3 gap-3">
                {GAME_MODES.map((mode) => {
                  const stats = player.stats[mode as keyof typeof player.stats]
                  return (
                    <div
                      key={mode}
                      className={`rounded-lg p-3 border ${getTierBgColor(stats.tier, mode)} flex flex-col items-center gap-2`}
                    >
                      <p className="text-xs font-bold text-muted-foreground">{mode}</p>
                      <p className={`text-xs font-bold ${getTierColor(stats.tier, mode)}`}>{stats.tier}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
