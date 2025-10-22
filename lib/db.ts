import type { Player } from "./types"

const STORAGE_KEY = "alivetierlist_players"

function getDefaultPlayers(): Player[] {
  return [
    {
      id: "1",
      name: "Marlowww",
      overallPoints: 5200,
      stats: {
        UHC: { tier: "HT5", points: 5200 },
        Crystal: { tier: "HT4", points: 4800 },
        Sword: { tier: "HT3", points: 4200 },
        Nethpot: { tier: "HT2", points: 3800 },
        SMP: { tier: "HT1", points: 3200 },
      },
    },
    {
      id: "2",
      name: "ItzRealMe",
      overallPoints: 5100,
      stats: {
        UHC: { tier: "HT4", points: 4800 },
        Crystal: { tier: "HT5", points: 5100 },
        Sword: { tier: "HT2", points: 3800 },
        Nethpot: { tier: "HT3", points: 4200 },
        SMP: { tier: "LT1", points: 2800 },
      },
    },
    {
      id: "3",
      name: "Swight",
      overallPoints: 4800,
      stats: {
        UHC: { tier: "HT3", points: 4200 },
        Crystal: { tier: "HT2", points: 3800 },
        Sword: { tier: "HT5", points: 4800 },
        Nethpot: { tier: "HT1", points: 3200 },
        SMP: { tier: "HT2", points: 3800 },
      },
    },
    {
      id: "4",
      name: "NetherKing",
      overallPoints: 4600,
      stats: {
        UHC: { tier: "HT2", points: 3800 },
        Crystal: { tier: "HT3", points: 4200 },
        Sword: { tier: "HT1", points: 3200 },
        Nethpot: { tier: "HT5", points: 4600 },
        SMP: { tier: "HT3", points: 4200 },
      },
    },
    {
      id: "5",
      name: "VoidWalker",
      overallPoints: 4200,
      stats: {
        UHC: { tier: "HT4", points: 4800 },
        Crystal: { tier: "LT1", points: 2800 },
        Sword: { tier: "LT2", points: 3200 },
        Nethpot: { tier: "LT1", points: 2800 },
        SMP: { tier: "HT2", points: 3800 },
      },
    },
    {
      id: "6",
      name: "PhantomSlayer",
      overallPoints: 3800,
      stats: {
        UHC: { tier: "LT3", points: 3800 },
        Crystal: { tier: "LT2", points: 3200 },
        Sword: { tier: "LT1", points: 2800 },
        Nethpot: { tier: "LT2", points: 3200 },
        SMP: { tier: "LT1", points: 2800 },
      },
    },
    {
      id: "7",
      name: "IceBreaker",
      overallPoints: 3200,
      stats: {
        UHC: { tier: "LT2", points: 3200 },
        Crystal: { tier: "LT1", points: 2800 },
        Sword: { tier: "LT3", points: 3800 },
        Nethpot: { tier: "N/A", points: 0 },
        SMP: { tier: "LT2", points: 3200 },
      },
    },
    {
      id: "8",
      name: "FireDancer",
      overallPoints: 3100,
      stats: {
        UHC: { tier: "LT1", points: 2800 },
        Crystal: { tier: "LT2", points: 3200 },
        Sword: { tier: "N/A", points: 0 },
        Nethpot: { tier: "LT2", points: 3200 },
        SMP: { tier: "LT1", points: 2800 },
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
