import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: Request) {
  try {
    const { players } = await request.json()

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

    const dbPath = join(process.cwd(), "lib", "db.ts")
    await writeFile(dbPath, dbContent, "utf-8")

    return Response.json({ success: true, message: "Database file updated successfully" })
  } catch (error) {
    console.error("[v0] Error saving database:", error)
    return Response.json({ error: "Failed to save database file" }, { status: 500 })
  }
}
