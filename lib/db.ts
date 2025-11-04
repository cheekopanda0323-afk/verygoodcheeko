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
    id: "11",
    name: "araul",
    overallPoints: 2,
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
        tier: "HT5",
        points: 2
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
  },
  {
    id: "13",
    name: "Gr8Bizzo",
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
      },
      SMPKIT: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "14",
    name: "348k",
    overallPoints: 18,
    stats: {
      UHC: {
        tier: "LT3",
        points: 6
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "LT3",
        points: 6
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
      },
      SMP: {
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
    id: "15",
    name: "hassan",
    overallPoints: 6,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "LT3",
        points: 6
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
  },
  {
    id: "14",
    name: "Cheeko",
    overallPoints: 2,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "HT5",
        points: 2
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
  },
  {
    id: "15",
    name: "Unmuted_AnT",
    overallPoints: 10,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "HT4",
        points: 4
      },
      NETHPOT: {
        tier: "LT3",
        points: 6
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
  },
  {
    id: "16",
    name: "aditi_ytg",
    overallPoints: 6,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "LT3",
        points: 6
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
  },
  {
    id: "17",
    name: "Lt4What",
    overallPoints: 2,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "HT5",
        points: 2
      }
    }
  },
  {
    id: "18",
    name: "Y_Cubic_X",
    overallPoints: 3,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "LT4",
        points: 3
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
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
  },
  {
    id: "19",
    name: "NotUrSHARK",
    overallPoints: 2,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "HT5",
        points: 2
      }
    }
  },
  {
    id: "20",
    name: "shanvi",
    overallPoints: 4,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
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
  },
  {
    id: "21",
    name: "lalaj_gg",
    overallPoints: 6,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "HT5",
        points: 2
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "HT4",
        points: 4
      }
    }
  },
  {
    id: "22",
    name: "sultanplays",
    overallPoints: 3,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "LT5",
        points: 1
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "HT5",
        points: 2
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
  },
  {
    id: "23",
    name: "SLBChocos",
    overallPoints: 2,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "N/A",
        points: 0
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      SMPKIT: {
        tier: "HT5",
        points: 2
      }
    }
  },
  {
    id: "24",
    name: "Ezy_Dino899",
    overallPoints: 2,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "HT5",
        points: 2
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
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
  },
  {
    id: "25",
    name: "Buyzer",
    overallPoints: 2,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      CRYSTAL: {
        tier: "HT5",
        points: 2
      },
      SWORD: {
        tier: "N/A",
        points: 0
      },
      NETHPOT: {
        tier: "N/A",
        points: 0
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
