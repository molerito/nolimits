import { NextResponse } from "next/server"
import { getAdminCredentials, getMasterPassword, setSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const credentials = getAdminCredentials()
    const masterPassword = getMasterPassword()

    // Validar username y contraseña (usuario o maestra)
    const isValidPassword = 
      password === credentials.password || 
      (masterPassword && password === masterPassword)

    if (username === credentials.username && isValidPassword) {
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
