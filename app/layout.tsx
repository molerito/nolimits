import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: 'No Limits | Entrenador Personal',
  description: 'Supera tus limites con No Limits. Entrenamiento personal, crosstraining, preparacion fisica y mucho mas. Reserva tu clase de prueba gratis.',
  keywords: ['entrenador personal', 'crosstraining', 'fitness', 'gym', 'entrenamiento', 'No Limits'],
  authors: [{ name: 'No Limits' }],
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
