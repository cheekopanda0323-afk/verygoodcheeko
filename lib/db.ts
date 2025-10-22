import type { Player } from "./types"

const STORAGE_KEY = "alivetierlist_players"

function getDefaultPlayers(): Player[] {
  return [
    {

      id: "1",

      name: "CuteBoy2",

      overallPoints: 20,

      stats: {

            UHC: { tier: "N/A", points: 0 },
            Crystal: { tier: "N/A", points: 0 },
            Sword: { tier: "N/A", points: 0 },
            Nethpot: { tier: "N/A", points: 0 },
            SMP: { tier: "N/A", points: 0 },
            Uhc: { tier: "LT2", points: 20 },

      },

    },
]
}

export function getAllPlayers(): Player[] {
  return getDefaultPlayers()
}

export function searchPlayers(query: string): Player[] {
  const players = getDefaultPlayers()
  const lowerQuery = query.toLowerCase()
  return players.filter((p) => p.name.toLowerCase().includes(lowerQuery))
}
