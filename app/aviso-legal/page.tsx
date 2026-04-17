import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Aviso Legal | No Limits",
  description: "Aviso legal e información del titular de No Limits entrenamiento personal",
}

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </Link>

        <h1 className="text-4xl font-black mb-8">
          Aviso <span className="text-primary">Legal</span>
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Datos Identificativos</h2>
            <p className="text-muted-foreground leading-relaxed">
              En cumplimiento del deber de información establecido en la Ley 34/2002 de Servicios de la 
              Sociedad de la Información y el Comercio Electrónico (LSSI-CE), se facilitan a continuación 
              los datos identificativos del titular de este sitio web:
            </p>
            <ul className="list-none text-muted-foreground mt-4 space-y-2">
              <li><strong className="text-foreground">Denominación:</strong> No Limits Entrenamiento Personal</li>
              <li><strong className="text-foreground">Actividad:</strong> Servicios de entrenamiento personal y fitness</li>
              <li><strong className="text-foreground">Email:</strong> info@nolimits.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Objeto</h2>
            <p className="text-muted-foreground leading-relaxed">
              El presente sitio web tiene por objeto facilitar información sobre los servicios de 
              entrenamiento personal ofrecidos por No Limits, así como permitir a los usuarios ponerse 
              en contacto con nosotros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Propiedad Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos los contenidos de este sitio web, incluyendo textos, imágenes, gráficos, logotipos, 
              iconos y software, son propiedad de No Limits o de terceros que han autorizado su uso, 
              y están protegidos por las leyes de propiedad intelectual e industrial.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Queda prohibida cualquier forma de reproducción, distribución, comunicación pública, 
              transformación o cualquier otra actividad que se pueda realizar con los contenidos de 
              este sitio web sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Exclusión de Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              No Limits no se hace responsable de los daños y perjuicios que pudieran derivarse del uso 
              de este sitio web, incluyendo errores u omisiones en los contenidos, falta de disponibilidad 
              del sitio o transmisión de virus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Enlaces a Terceros</h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio web puede contener enlaces a sitios de terceros. No Limits no se responsabiliza 
              del contenido ni de las políticas de privacidad de dichos sitios externos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Legislación Aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia 
              que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los 
              juzgados y tribunales competentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              No Limits se reserva el derecho de realizar las modificaciones que considere oportunas 
              en este aviso legal, sin previo aviso. Dichas modificaciones serán efectivas desde su 
              publicación en este sitio web.
            </p>
          </section>

          <p className="text-sm text-muted-foreground pt-8 border-t border-border">
            Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </main>
  )
}
