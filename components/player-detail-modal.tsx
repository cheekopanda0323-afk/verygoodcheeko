"use client"
import { useState, useEffect } from "react" // useEffect aur useState zaruri hain
import type { Player } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PlayerDetailModalProps {
  player: Player | null
  isOpen: boolean
  onClose: () => void
}

export function PlayerDetailModal({ player, isOpen, onClose }: PlayerDetailModalProps) {
  // Image URL state manage karne ke liye
  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    if (player) {
      // Player change hone par naya URL set karo
      setImgSrc(`https://visage.surgeplay.com/bust/512/${player.name}`)
    }
  }, [player])

  if (!isOpen || !player) return null

  // Cracked Players Image Fix logic
  const handleImageError = () => {
    // Mojang Placeholders (Deterministic Steve/Alex for cracked players)
    const steveUUID = "c06f89064c8a49119c29ea1dbd1aab82"
    const alexUUID = "606e2ff0ed7748429d6ce1d3321c7838"
    const useSteve = player.name.length % 2 === 0
    
    // Fallback to Steve/Alex bust image
    setImgSrc(`https://visage.surgeplay.com/bust/512/${useSteve ? steveUUID : alexUUID}`)
  }

  // --- COLOR FUNCTIONS UPDATED ---
  const getTierColor = (tier: string, mode?: string) => {
    if (tier === "N/A") return "text-muted-foreground"
    if (mode === "UHC") return "text-[#ffa500]"
    if (mode === "Crystal") return "text-[#c084fc]"
    if (mode === "Nethpot") return "text-[#ff4444]"
    if (mode === "SMP") return "text-[#ef4444]"
    if (mode === "Sword") return "text-yellow-400"
    if (mode === "DiaSMP") return "text-[#00bfff]" // ADDED
    if (mode === "Mace PvP") return "text-[#ffd700]" // ADDED
    if (mode === "AxePvP") return "text-[#ff6b35]" // ADDED
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
    if (mode === "DiaSMP") return "bg-[#00bfff]/10 border-[#00bfff]/50" // ADDED
    if (mode === "Mace PvP") return "bg-[#ffd700]/10 border-[#ffd700]/50" // ADDED
    if (mode === "AxePvP") return "bg-[#ff6b35]/10 border-[#ff6b35]/50" // ADDED
    if (tier.startsWith("HT")) return "bg-primary/10 border-primary/50"
    return "bg-yellow-400/10 border-yellow-400/50"
  }
  // --- END COLOR FUNCTIONS UPDATE ---

  const getGameModeLabel = (mode: string) => {
    return mode
  }

  const gameModesArray = Object.entries(player.stats)

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-primary/30 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-end">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary glow-red bg-secondary/30">
              {imgSrc && (
                <Image
                  // UPDATED: Now uses imgSrc state
                  src={imgSrc}
                  alt={player.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={handleImageError} // UPDATED: Error handler added
                  unoptimized
                  priority
                />
              )}
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-glow-red">{player.name}</h2>
              <p className="text-sm text-muted-foreground">{player.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">TIERS</h3>
            <div className="grid grid-cols-3 gap-3">
              {gameModesArray.map(([mode, stats]) => (
                <div
                  key={mode}
                  className={`rounded-lg p-3 border ${getTierBgColor(stats.tier, mode)} flex flex-col items-center gap-2`}
                >
                  <p className="text-xs font-bold text-muted-foreground">{getGameModeLabel(mode)}</p>
                  <p className={`text-xs font-bold ${getTierColor(stats.tier, mode)}`}>{stats.tier}</p>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 glow-orange-hover">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
