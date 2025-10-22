"use client"

import { useState } from "react"
import { type Player, TIERS, GAME_MODES, REGIONS } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Github, Plus } from "lucide-react"

export function AdminPanel() {
  const [players, setPlayers] = useState<Player[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    region: "NA" as const,
    gameMode: "SMP" as const,
    tier: "HT1" as const,
    points: 0,
  })

  const handleAddPlayer = () => {
    if (!formData.name.trim()) {
      setMessage("Player name is required")
      return
    }

    setMessage("")

    if (editingId) {
      const player = players.find((p) => p.id === editingId)
      if (player) {
        const updatedStats = { ...player.stats }
        updatedStats[formData.gameMode] = {
          tier: formData.tier,
          points: formData.points,
        }
        const overallPoints = Math.max(...Object.values(updatedStats).map((s) => s.points))

        setPlayers(
          players.map((p) =>
            p.id === editingId ? { ...p, stats: updatedStats, overallPoints, region: formData.region } : p,
          ),
        )
        setMessage("Player updated successfully!")
        setEditingId(null)
      }
    } else {
      const newStats = {
        UHC: { tier: "N/A" as const, points: 0 },
        Crystal: { tier: "N/A" as const, points: 0 },
        Sword: { tier: "N/A" as const, points: 0 },
        Nethpot: { tier: "N/A" as const, points: 0 },
        SMP: { tier: "N/A" as const, points: 0 },
      }
      newStats[formData.gameMode] = {
        tier: formData.tier,
        points: formData.points,
      }

      const newPlayer: Player = {
        id: Date.now().toString(),
        name: formData.name,
        region: formData.region,
        overallPoints: formData.points,
        stats: newStats,
      }

      setPlayers([...players, newPlayer])
      setMessage("Player added successfully!")
    }

    setFormData({ name: "", region: "NA", gameMode: "SMP", tier: "HT1", points: 0 })
  }

  const handleEdit = (player: Player) => {
    setEditingId(player.id)
    const firstGameMode = GAME_MODES[0]
    const stats = player.stats[firstGameMode]
    setFormData({
      name: player.name,
      region: player.region,
      gameMode: firstGameMode,
      tier: stats.tier,
      points: stats.points,
    })
  }

  const handleDelete = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id))
    setMessage("Player deleted successfully!")
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: "", region: "NA", gameMode: "SMP", tier: "HT1", points: 0 })
    setMessage("")
  }

  const handleExport = () => {
    const dbContent = `import type { Player } from "./types"

const STORAGE_KEY = "alivetierlist_players"

function getDefaultPlayers(): Player[] {
  return ${JSON.stringify(players, null, 2)}
}

export function getAllPlayers(): Player[] {
  return getDefaultPlayers()
}

export function searchPlayers(query: string): Player[] {
  const players = getDefaultPlayers()
  const lowerQuery = query.toLowerCase()
  return players.filter((p) => p.name.toLowerCase().includes(lowerQuery))
}
`
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dbContent))
    element.setAttribute("download", "player-data.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    setMessage(`Database file (player-data.txt) exported successfully with ${players.length} player(s)!`)
  }

  const handleGitHub = () => {
    window.open("https://github.com/cheekopanda0323-afk/verygoodcheeko/tree/main/lib", "_blank")
  }

  return (
    <div className="min-h-screen bg-background pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-glow-red mb-2">Admin Panel</h1>
        <p className="text-muted-foreground mb-8">Manage players and tier list data</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={handleExport}
            className="bg-primary hover:bg-primary/90 glow-orange-hover flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={handleGitHub}
            className="bg-secondary hover:bg-secondary/90 border border-border flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Button>
          <Button
            onClick={handleAddPlayer}
            className="bg-purple-600 hover:bg-purple-700 glow-purple-hover flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Player
          </Button>
        </div>

        {message && (
          <div className="bg-primary/20 border border-primary rounded-lg p-4 mb-6 text-primary">{message}</div>
        )}

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Player" : "Add New Player"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              placeholder="Player Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-secondary border-border text-foreground"
            />

            <Select value={formData.region} onValueChange={(value: any) => setFormData({ ...formData, region: value })}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.gameMode}
              onValueChange={(value: any) => setFormData({ ...formData, gameMode: value })}
            >
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {GAME_MODES.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={formData.tier} onValueChange={(value: any) => setFormData({ ...formData, tier: value })}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {TIERS.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Points"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) || 0 })}
              className="bg-secondary border-border text-foreground"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleAddPlayer} className="bg-primary hover:bg-primary/90 glow-orange-hover">
              {editingId ? "Update Player" : "Add Player"}
            </Button>
            {editingId && (
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Name</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Region</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Overall Points</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6 font-semibold">{player.name}</td>
                  <td className="py-4 px-6 text-primary">{player.region}</td>
                  <td className="py-4 px-6 text-primary">{player.overallPoints}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(player)}
                        className="bg-primary/20 text-primary hover:bg-primary/30"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(player.id)}
                        variant="outline"
                        className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
