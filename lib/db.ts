import type { Player } from "./types"

const STORAGE_KEY = "alivetierlist_players"

function getDefaultPlayers(): Player[] {
  return [
  {
    id: "1",
    name: "Whistlin",
    overallPoints: 30,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "LT2",
        points: 20
      },
      SMP: {
        tier: "HT3",
        points: 10
      }
    }
  },
  {
    id: "2",
    name: "Xerxermot",
    overallPoints: 20,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "LT2",
        points: 20
      }
    }
  },
  {
    id: "3",
    name: "Rag3core",
    overallPoints: 3,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "LT4",
        points: 3
      },
      SMP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "4",
    name: "luinorXD_",
    overallPoints: 4,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "HT4",
        points: 4
      },
      SMP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "5",
    name: "ITZ_SKPLAYZ",
    overallPoints: 4,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "HT4",
        points: 4
      },
      SMP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "6",
    name: "PrimoTheBoat",
    overallPoints: 4,
    stats: {
      UHC: {
        tier: "HT4",
        points: 4
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "7",
    name: "C3lesti4lAur0ra",
    overallPoints: 6,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "LT3",
        points: 6
      }
    }
  },
  {
    id: "8",
    name: "IcyDreamYtishere",
    overallPoints: 3,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "LT4",
        points: 3
      },
      SMP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "9",
    name: "LP_Gamer_Yt",
    overallPoints: 3,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "LT4",
        points: 3
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "10",
    name: "Cheeko",
    overallPoints: 6,
    stats: {
      UHC: {
        tier: "HT5",
        points: 2
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "HT4",
        points: 4
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "N/A",
        points: 0
      }
    }
  }
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
