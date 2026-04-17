import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Términos y Condiciones | No Limits",
  description: "Términos y condiciones de uso de No Limits entrenamiento personal",
}

export default function TerminosYCondicionesPage() {
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
          Términos y <span className="text-primary">Condiciones</span>
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceptación de los Términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar los servicios de No Limits, aceptas estar sujeto a estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder a nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Descripción de los Servicios</h2>
            <p className="text-muted-foreground leading-relaxed">
              No Limits ofrece servicios de entrenamiento personal, clases grupales, planificación deportiva y 
              asesoramiento nutricional. Los servicios específicos y sus condiciones serán acordados de forma 
              individual con cada cliente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Requisitos de Salud</h2>
            <p className="text-muted-foreground leading-relaxed">
              Antes de comenzar cualquier programa de entrenamiento, el cliente debe informar sobre cualquier 
              condición médica, lesión o limitación física. Se recomienda obtener autorización médica antes 
              de iniciar cualquier programa de ejercicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Pagos y Cancelaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los pagos deben realizarse según lo acordado en el contrato de servicios. Las cancelaciones 
              de sesiones deben notificarse con al menos 24 horas de anticipación. Las sesiones no canceladas 
              a tiempo podrán ser cobradas íntegramente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              No Limits no se hace responsable de lesiones que puedan ocurrir durante el entrenamiento si el 
              cliente no ha seguido las instrucciones del entrenador o no ha informado sobre condiciones 
              médicas preexistentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              No Limits se reserva el derecho de modificar estos términos en cualquier momento. Los cambios 
              serán efectivos inmediatamente después de su publicación en este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para cualquier consulta sobre estos términos y condiciones, puedes contactarnos a través de 
              nuestro formulario de contacto o por los medios indicados en nuestra página web.
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
