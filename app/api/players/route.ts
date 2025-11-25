import { db } from "@/lib/db"

export async function GET() {
  try {
    const players = db.getAllPlayers()
    return Response.json(players)
  } catch (error) {
    return Response.json({ error: "Failed to fetch players" }, { status: 500 })
  }
}
