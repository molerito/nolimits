import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { GalleryManager } from "@/components/admin/gallery-manager"
import { LogoutButton } from "@/components/admin/logout-button"
import Link from "next/link"

export default async function AdminGalleryPage() {
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
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/configuracion"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Configuración
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestion de Galeria</h1>
          <p className="text-muted-foreground">
            Sube, ordena y elimina las imagenes del carrusel de la galeria.
          </p>
        </div>

        <GalleryManager />
      </div>
    </main>
  )
}
