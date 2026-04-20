import { writeFile, readFile } from "fs/promises"
import { join } from "path"
import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"

export async function POST(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Contraseña actual y nueva son requeridas" },
        { status: 400 }
      )
    }

    // Obtener contraseña actual del env
    const adminPassword = process.env.ADMIN_PASSWORD || "nolimits2026"

    // Validar que la contraseña actual sea correcta
    if (currentPassword !== adminPassword) {
      return NextResponse.json(
        { error: "La contraseña actual es incorrecta" },
        { status: 401 }
      )
    }

    // Validar nueva contraseña
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "La nueva contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Actualizar .env.local
    const envPath = join(process.cwd(), ".env.local")

    try {
      // Leer archivo actual
      let envContent = ""
      try {
        envContent = await readFile(envPath, "utf-8")
      } catch {
        // Si el archivo no existe, comenzar con vacío
        envContent = ""
      }

      // Actualizar o agregar ADMIN_PASSWORD
      const lines = envContent.split("\n")
      const updatedLines = lines.filter((line) => !line.startsWith("ADMIN_PASSWORD="))

      // Agregar nueva contraseña
      updatedLines.push(`ADMIN_PASSWORD=${newPassword}`)

      // Escribir archivo
      await writeFile(envPath, updatedLines.join("\n"))

      console.log("✅ Contraseña actualizada en .env.local")

      return NextResponse.json({
        success: true,
        message: "Contraseña actualizada correctamente",
      })
    } catch (fileError) {
      console.error("Error al escribir .env.local:", fileError)
      return NextResponse.json(
        { error: "Error al guardar la contraseña. Intenta nuevamente." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error changing password:", error)
    return NextResponse.json(
      { error: "Error al cambiar la contraseña" },
      { status: 500 }
    )
  }
}
