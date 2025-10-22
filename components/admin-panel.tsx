"use client"

import { useState, useEffect } from "react"
import { type Player, TIERS, GAME_MODES } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Github, Plus } from "lucide-react"

export function AdminPanel() {
  const [players, setPlayers] = useState<Player[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    gameMode: "SMP" as const,
    tier: "HT1" as const,
    points: 0,
  })

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/players")
      const data = await response.json()
      setPlayers(data)
    } catch (error) {
      console.error("[v0] Error fetching players:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPlayer = async () => {
    if (!formData.name.trim()) {
      setMessage("Player name is required")
      return
    }

    try {
      setLoading(true)
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

          const response = await fetch("/api/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "update",
              id: editingId,
              updates: { stats: updatedStats, overallPoints },
            }),
          })

          if (response.ok) {
            setPlayers(players.map((p) => (p.id === editingId ? { ...p, stats: updatedStats, overallPoints } : p)))
            setMessage("Player updated successfully!")
            setEditingId(null)
          }
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

        const response = await fetch("/api/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add",
            player: {
              name: formData.name,
              overallPoints: formData.points,
              stats: newStats,
            },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setPlayers([...players, data.player])
          setMessage("Player added successfully!")
        }
      }

      setFormData({ name: "", gameMode: "SMP", tier: "HT1", points: 0 })
    } catch (error) {
      console.error("[v0] Error:", error)
      setMessage("Error adding/updating player")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (player: Player) => {
    setEditingId(player.id)
    const firstGameMode = GAME_MODES[0]
    const stats = player.stats[firstGameMode]
    setFormData({
      name: player.name,
      gameMode: firstGameMode,
      tier: stats.tier,
      points: stats.points,
    })
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      })

      if (!response.ok) {
        const error = await response.json()
        setMessage(`Error: ${error.error || "Failed to delete player"}`)
        return
      }

      setPlayers(players.filter((p) => p.id !== id))
      setMessage("Player deleted successfully!")
    } catch (error) {
      console.error("[v0] Error deleting player:", error)
      setMessage("Error deleting player")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: "", gameMode: "SMP", tier: "HT1", points: 0 })
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4 pb-12 flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    )
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
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Overall Points</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6 font-semibold">{player.name}</td>
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
