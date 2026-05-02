import { cookies } from "next/headers"

// Credenciales - la contraseña se carga desde env.local
export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "mistercc",
    password: process.env.ADMIN_PASSWORD || "nolimits2026",
  }
}

// Contraseña maestra para recuperación de acceso (DEBE estar configurada en variables de entorno)
export function getMasterPassword(): string | null {
  return process.env.MASTER_PASSWORD || null
}

const SESSION_COOKIE_NAME = "admin_session"
const SESSION_TOKEN = "authenticated_admin_session_token"

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return session?.value === SESSION_TOKEN
}

export async function setSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 horas
    path: "/",
  })
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
