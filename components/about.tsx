import { CheckCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={siteConfig.about.image}
                alt={siteConfig.about.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Stats card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-2xl">
              <div className="text-center">
                <span className="block text-4xl font-black">{siteConfig.about.statsNumber}</span>
                <span className="text-sm font-medium opacity-90">{siteConfig.about.statsLabel}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
              {siteConfig.about.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {siteConfig.about.title}{" "}
              <span className="text-primary">{siteConfig.about.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {siteConfig.about.description1}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {siteConfig.about.description2}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.about.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
