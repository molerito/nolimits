import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { LoginForm } from "@/components/admin/login-form"

export default async function AdminPage() {
  const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect("/admin/galeria")
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black">
            NO <span className="text-primary">LIMITS</span>
          </h1>
          <p className="text-muted-foreground mt-2">Panel de Administracion</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
