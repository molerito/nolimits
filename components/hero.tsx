"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url('${siteConfig.hero.backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            {siteConfig.hero.badge}
          </span>
          
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
            <Image
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.logoAlt}
              width={120}
              height={120}
              className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
            />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                {siteConfig.brand.namePart1}
              </span>{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,221,0,0.8)]">
                {siteConfig.brand.namePart2}
              </span>
            </h1>


          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {siteConfig.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 font-semibold"
              onClick={() => scrollToSection("contacto")}
            >
              {siteConfig.hero.ctaPrimary}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 font-semibold border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => scrollToSection("servicios")}
            >
              {siteConfig.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={() => scrollToSection("servicios")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer"
        aria-label={siteConfig.hero.scrollLabel}
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
