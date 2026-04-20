import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { ChangePasswordForm } from "@/components/admin/change-password-form"
import { LogoutButton } from "@/components/admin/logout-button"
import Link from "next/link"

export default async function AdminSettingsPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/admin")
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black">
              NO <span className="text-primary">LIMITS</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">Panel de Administracion</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Configuración</h1>
          <p className="text-muted-foreground">
            Administra la configuración de tu cuenta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <Link
                href="/admin/galeria"
                className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                Galería
              </Link>
              <div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                Configuración
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </main>
  )
}
