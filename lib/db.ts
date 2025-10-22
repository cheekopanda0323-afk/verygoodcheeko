import type { Player } from "./types"

const STORAGE_KEY = "alivetierlist_players"

function getDefaultPlayers(): Player[] {
  return [
    {
      id: "1",
      name: "Whistlin",
      overallPoints: 130,
      stats: {
        SMP: { tier: "HT3", points: 60 },
        Nethpot: { tier: "LT2", points: 70 },
      },
    },
    {
      id: "2",
      name: "Xerxermot",
      overallPoints: 70,
      stats: {
        SMPKIT: { tier: "LT2", points: 70 },
      },
    },
    {
      id: "3",
      name: "Rag3core",
      overallPoints: 30,
      stats: {
        Nethpot: { tier: "LT4", points: 30 },
      },
    },
    {
      id: "4",
      name: "luinorXD_",
      overallPoints: 40,
      stats: {
        Nethpot: { tier: "HT4", points: 40 },
      },
    },
    {
      id: "5",
      name: "ITZ_SKPLAYZ",
      overallPoints: 40,
      stats: {
        Nethpot: { tier: "HT4", points: 40 },
      },
    },
    {
      id: "6",
      name: "PrimoTheBoat",
      overallPoints: 40,
      stats: {
        UHC: { tier: "HT4", points: 40 },
      },
    },
    {
      id: "7",
      name: "C3lesti4lAur0ra",
      overallPoints: 50,
      stats: {
        SMPKIT: { tier: "LT3", points: 50 },
      },
    },
    {
      id: "8",
      name: "IcyDreamYtishere",
      overallPoints: 30,
      stats: {
        Nethpot: { tier: "LT4", points: 30 },
      },
    },
    {
      id: "9",
      name: "LP_Gamer_Yt",
      overallPoints: 30,
      stats: {
        Crystal: { tier: "LT4", points: 30 },
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
