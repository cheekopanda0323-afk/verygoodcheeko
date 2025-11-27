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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      SMP: {
        tier: "LT2",
        points: 20
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      SMP: {
        tier: "LT3",
        points: 6
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "LT3",
        points: 6
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "LT3",
        points: 6
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "LT3",
        points: 6
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "LT3",
        points: 6
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "HT5",
        points: 2
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "HT5",
        points: 2
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "21",
    name: "lalaj_gg",
    overallPoints: 11,
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
        tier: "LT4",
        points: 3
      },
      Nethpot: {
        tier: "HT4",
        points: 4
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "HT4",
        points: 4
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
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
      Crystal: {
        tier: "LT5",
        points: 1
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
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "HT5",
        points: 2
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "24",
    name: "Ezy_Dino899",
    overallPoints: 4,
    stats: {
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "HT5",
        points: 2
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
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
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
      Crystal: {
        tier: "HT5",
        points: 2
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "26",
    name: "mpvlsn",
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "27",
    name: "NotReziXd",
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
        tier: "HT5",
        points: 2
      },
      Nethpot: {
        tier: "LT5",
        points: 1
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "28",
    name: "chiva",
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
        tier: "HT5",
        points: 2
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "29",
    name: "Freaky_Chopper",
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
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "30",
    name: "smk",
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
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "HT5",
        points: 2
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "31",
    name: "idkmyuserGOAT62",
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
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "130",
    name: "hwless",
    overallPoints: 25,
    stats: {
      "Mace PvP": {
        tier: "LT4",
        points: 3
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "LT3",
        points: 6
      },
      DiaSMP: {
        tier: "LT3",
        points: 6
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "HT4",
        points: 4
      },
      Nethpot: {
        tier: "LT3",
        points: 6
      },
      Sword: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "131",
    name: "Betaaj",
    overallPoints: 9,
    stats: {
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "LT4",
        points: 3
      },
      Nethpot: {
        tier: "LT4",
        points: 3
      },
      Sword: {
        tier: "LT4",
        points: 3
      }
    }
  },
  {
    id: "132",
    name: "ObsessedFr",
    overallPoints: 6,
    stats: {
      "Mace PvP": {
        tier: "LT3",
        points: 6
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "136",
    name: "PRABHAV_XD",
    overallPoints: 3,
    stats: {
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "LT4",
        points: 3
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "137",
    name: "Flme",
    overallPoints: 2,
    stats: {
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "HT5",
        points: 2
      },
      Sword: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "138",
    name: "Vegeta1121",
    overallPoints: 4,
    stats: {
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "N/A",
        points: 0
      },
      Nethpot: {
        tier: "HT4",
        points: 4
      },
      Sword: {
        tier: "N/A",
        points: 0
      }
    }
  },
  {
    id: "139",
    name: "Fleat",
    overallPoints: 1,
    stats: {
      "Mace PvP": {
        tier: "N/A",
        points: 0
      },
      AxePvP: {
        tier: "N/A",
        points: 0
      },
      SMP: {
        tier: "N/A",
        points: 0
      },
      DiaSMP: {
        tier: "N/A",
        points: 0
      },
      UHC: {
        tier: "N/A",
        points: 0
      },
      Crystal: {
        tier: "LT5",
        points: 1
      },
      Nethpot: {
        tier: "N/A",
        points: 0
      },
      Sword: {
        tier: "N/A",
        points: 0
      }
    }
  }
]
}

export const db = {
  getAllPlayers: () => getDefaultPlayers(),
}

export function getAllPlayers(): Player[] {
  return getDefaultPlayers()
}

export function searchPlayers(query: string): Player[] {
  const players = getDefaultPlayers()
  const lowerQuery = query.toLowerCase()
  return players.filter((p) => p.name.toLowerCase().includes(lowerQuery))
}
