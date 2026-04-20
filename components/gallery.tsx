"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

interface GalleryImage {
  src: string
  alt: string
}

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(siteConfig.gallery.images)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/admin/gallery")
        if (res.ok) {
          const data = await res.json()
          if (data.images && data.images.length > 0) {
            setImages(
              data.images.map((img: { url: string; filename: string }) => ({
                src: img.url,
                alt: img.filename,
              }))
            )
          }
        }
      } catch {
        // Si falla, usar imagenes por defecto del config
      }
    }
    fetchImages()
  }, [])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="galeria" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            {siteConfig.gallery.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            {siteConfig.gallery.title}{" "}
            <span className="text-primary">{siteConfig.gallery.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {siteConfig.gallery.description}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-primary/50 hover:bg-primary hover:text-primary-foreground"
            onClick={scrollPrev}
            aria-label={siteConfig.gallery.prevLabel}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-primary/50 hover:bg-primary hover:text-primary-foreground"
            onClick={scrollNext}
            aria-label={siteConfig.gallery.nextLabel}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
