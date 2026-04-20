"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, LucideIcon } from "lucide-react"
import { siteConfig } from "@/lib/config"

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construir el mensaje para WhatsApp
    const whatsappMessage = `Hola! Soy ${formData.name}\n\n📱 Teléfono: ${formData.phone}\n\n💬 Mensaje:\n${formData.message}`
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`
    
    // Abrir WhatsApp en nueva ventana
    window.open(whatsappUrl, '_blank')
    
    // Mostrar mensaje de confirmación
    //alert(siteConfig.contact.successMessage)
    
    // Limpiar formulario
    setFormData({ name: "", phone: "", message: "" })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contacto" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            {siteConfig.contact.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            {siteConfig.contact.title}{" "}
            <span className="text-primary">{siteConfig.contact.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {siteConfig.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8">{siteConfig.contact.infoTitle}</h3>
            <div className="space-y-6">
              {siteConfig.contact.info.map((item) => {
                const Icon = iconMap[item.icon]
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <span className="block text-sm text-muted-foreground mb-1">
                        {item.label}
                      </span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h3 className="text-2xl font-bold mb-6">{siteConfig.contact.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {siteConfig.contact.form.name.label}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={siteConfig.contact.form.name.placeholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-border"
                />
              </div>
             <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {siteConfig.contact.form.phone.label}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={siteConfig.contact.form.phone.placeholder}
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {siteConfig.contact.form.message.label}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={siteConfig.contact.form.message.placeholder}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-secondary border-border resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full font-semibold">
                {siteConfig.contact.submitButton}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
