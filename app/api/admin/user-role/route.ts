import { NextResponse } from "next/server"
import { isAuthenticated, getUserRole } from "@/lib/auth"

export async function GET() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const role = await getUserRole()
    return NextResponse.json({ role })
  } catch {
    return NextResponse.json(
      { error: "Error al obtener el rol" },
      { status: 500 }
    )
  }
}
