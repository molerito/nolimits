import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Youtube, LucideIcon } from "lucide-react"
import { siteConfig } from "@/lib/config"

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  Youtube,
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.logoAlt}
                width={50}
                height={50}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <span className="text-2xl font-black tracking-tight">
            {siteConfig.brand.namePart1} <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,221,0,0.8)]">
                {siteConfig.brand.namePart2}
              </span> 
          </span>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {siteConfig.footer.socialLinks.map((social) => {
                const Icon = iconMap[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    aria-label={social.label}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {siteConfig.footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            {new Date().getFullYear()} {siteConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
