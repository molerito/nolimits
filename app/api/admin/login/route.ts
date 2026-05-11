import { NextResponse } from "next/server"
import { getAdminCredentials, getMasterPassword, getSuperuserUsername, setSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const credentials = getAdminCredentials()
    const masterPassword = getMasterPassword()
    const superuserUsername = getSuperuserUsername()

    // Ambos usan el mismo username: ADMIN_USERNAME
    if (username !== credentials.username && username !== superuserUsername) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      )
    }

    // Usuario normal: ADMIN_USERNAME con ADMIN_PASSWORD
    if (password === credentials.password) {
      await setSession("user")
      return NextResponse.json({ success: true, role: "user" })
    }

    // Superusuario: ADMIN_USERNAME con MASTER_PASSWORD
    if (password === masterPassword) {
      await setSession("superuser")
      return NextResponse.json({ success: true, role: "superuser" })
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
