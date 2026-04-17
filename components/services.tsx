import { Dumbbell, Users, Target, Flame, Calendar, Trophy, LucideIcon } from "lucide-react"
import { siteConfig } from "@/lib/config"

const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  Users,
  Target,
  Flame,
  Calendar,
  Trophy,
}

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            {siteConfig.services.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            {siteConfig.services.title}{" "}
            <span className="text-primary">{siteConfig.services.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {siteConfig.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.items.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <div
                key={service.title}
                className="group bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {Icon && <Icon className="w-7 h-7 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
