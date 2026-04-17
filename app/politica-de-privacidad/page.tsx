import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Política de Privacidad | No Limits",
  description: "Política de privacidad y protección de datos de No Limits entrenamiento personal",
}

export default function PoliticaDePrivacidadPage() {
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
          Política de <span className="text-primary">Privacidad</span>
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-muted-foreground leading-relaxed">
              No Limits es responsable del tratamiento de los datos personales que nos proporciones. 
              Nos comprometemos a proteger tu privacidad y a tratar tus datos de acuerdo con la normativa 
              vigente en materia de protección de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Datos que Recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos recopilar los siguientes datos personales:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información de salud relevante para el entrenamiento</li>
              <li>Objetivos de fitness y preferencias de entrenamiento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Finalidad del Tratamiento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tus datos personales serán utilizados para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Gestionar tu inscripción y prestación de servicios</li>
              <li>Personalizar tu programa de entrenamiento</li>
              <li>Comunicarnos contigo sobre tu progreso y citas</li>
              <li>Enviarte información sobre promociones y novedades (con tu consentimiento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Base Legal</h2>
            <p className="text-muted-foreground leading-relaxed">
              El tratamiento de tus datos está basado en tu consentimiento y en la ejecución del contrato 
              de prestación de servicios de entrenamiento personal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Conservación de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tus datos serán conservados mientras dure la relación contractual y, posteriormente, durante 
              los plazos legalmente establecidos o hasta que solicites su supresión.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Tus Derechos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento, oponerte al tratamiento 
              y solicitar la portabilidad de tus datos. Puedes ejercer estos derechos contactándonos a través 
              de los medios indicados en nuestra página web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Seguridad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales 
              contra accesos no autorizados, pérdida o destrucción.
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
