"use client"

import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function WhatsAppButton() {
  const message = encodeURIComponent(siteConfig.whatsapp.message)
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl"
      aria-label={siteConfig.whatsapp.ariaLabel}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
