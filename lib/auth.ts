import { cookies } from "next/headers"

export type UserRole = "user" | "superuser"

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

// Obtener el username para el superusuario (mismo que el usuario normal)
export function getSuperuserUsername(): string {
  return process.env.ADMIN_USERNAME || "mistercc"
}

const SESSION_COOKIE_NAME = "admin_session"
const SESSION_ROLE_COOKIE_NAME = "admin_role"
const SESSION_TOKEN = "authenticated_admin_session_token"

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return session?.value === SESSION_TOKEN
}

export async function getUserRole(): Promise<UserRole | null> {
  const cookieStore = await cookies()
  const role = cookieStore.get(SESSION_ROLE_COOKIE_NAME)
  return (role?.value as UserRole) || null
}

export async function setSession(role: UserRole): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 horas
    path: "/",
  })
  cookieStore.set(SESSION_ROLE_COOKIE_NAME, role, {
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
  cookieStore.delete(SESSION_ROLE_COOKIE_NAME)
}
