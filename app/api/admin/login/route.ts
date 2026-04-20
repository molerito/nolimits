import { NextResponse } from "next/server"
import { getAdminCredentials, setSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const credentials = getAdminCredentials()

    if (
      username === credentials.username &&
      password === credentials.password
    ) {
      await setSession()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: "Credenciales incorrectas" },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    )
  }
}
