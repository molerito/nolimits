export const siteConfig = {
  // Brand
  brand: {
    name: "No Limits",
    namePart1: "NO",
    namePart2: "LIMITS",
    logo: "/images/logo.png",
    logoAlt: "No Limits Logo",
  },

  // Navigation
  nav: {
    links: [
      { href: "#servicios", label: "Servicios" },
      { href: "#galeria", label: "Galeria" },
      { href: "#sobre-mi", label: "Sobre Mi" },
      { href: "#contacto", label: "Contacto" },
    ],
    ctaButton: "Contacta sin compromiso",
  },

  // Hero Section
  hero: {
    badge: "Entrenamiento Personal",
    subtitle: "Supera tus limites y alcanza tu mejor version. Entrenamiento personalizado adaptado a tus objetivos.",
    ctaPrimary: "Contacta sin compromiso",
    ctaSecondary: "Ver Servicios",
    scrollLabel: "Scroll hacia abajo",
    backgroundImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
  },

  // Services Section
  services: {
    badge: "Nuestros Servicios",
    title: "Todo lo que Necesitas para",
    titleHighlight: "Alcanzar tus Metas",
    description: "Ofrecemos una amplia gama de servicios de entrenamiento diseñados para ayudarte a superar tus limites.",
    items: [
      {
        icon: "Dumbbell",
        title: "Entrenamiento Personal",
        description: "Sesiones individuales adaptadas a tus objetivos y nivel de condicion fisica.",
      },
      {
        icon: "Users",
        title: "Clases Grupales",
        description: "Entrenamientos en grupo con ambiente motivador y seguimiento personalizado.",
      },
      {
        icon: "Target",
        title: "Crosstraining",
        description: "Entrenamiento funcional de alta intensidad para mejorar tu rendimiento global.",
      },
      {
        icon: "Flame",
        title: "Perdida de Peso",
        description: "Programas especificos para quemar grasa y alcanzar tu peso ideal.",
      },
      {
        icon: "Calendar",
        title: "Planificacion Deportiva",
        description: "Preparacion fisica para competiciones y eventos deportivos.",
      },
      {
        icon: "Trophy",
        title: "Transformacion Total",
        description: "Programa integral de cambio fisico y habitos de vida saludables.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    badge: "Galeria",
    title: "Un Vistazo a Nuestros",
    titleHighlight: "Entrenamientos",
    description: "Conoce nuestras instalaciones y el ambiente de trabajo que te espera.",
    prevLabel: "Imagen anterior",
    nextLabel: "Siguiente imagen",
    images: [
      {
        src: "/images/trab1.jpg",
        alt: "Entrenamiento con pesas",
      },
      {
        src: "/images/trab2.jpg",
        alt: "Crossfit workout",
      },
      {
        src: "/images/trab3.jpg",
        alt: "Entrenamiento funcional",
      },
      {
        src: "/images/trab4.jpg",
        alt: "Clase grupal",
      },
      {
        src: "/images/trab5.jpg",
        alt: "Personal training",
      },
    ],
  },

  // About Section
  about: {
    badge: "Sobre Mi",
    title: "Tu Entrenador,",
    titleHighlight: "Tu Guia",
    description1: "Soy un apasionado del fitness y el bienestar. Mi mision es ayudarte a descubrir tu potencial y superar los limites que creias tener. Con un enfoque personalizado y metodologias probadas, te acompaño en cada paso de tu transformacion.",
    description2: "Creo firmemente que todos somos capaces de lograr grandes cosas cuando tenemos la guia correcta y la motivacion adecuada. No se trata solo de entrenar, se trata de cambiar tu vida.",
    image: "/images/trainer.jpg",
    imageAlt: "Entrenador personal",
    statsNumber: "500+",
    statsLabel: "Clientes Transformados",
    highlights: [
      "Mas de 10 años de experiencia",
      "Certificaciones internacionales",
      "Entrenamiento 100% personalizado",
      "Seguimiento y apoyo continuo",
      "Resultados garantizados",
      "Horarios flexibles",
    ],
  },

  // Contact Section
  contact: {
    badge: "Contacto",
    title: "Únete a nuestra familia",
    titleHighlight: "No Limits",
    description: "Da el primer paso hacia tu transformacion. Contactanos y empieza hoy.",
    infoTitle: "Informacion de Contacto",
    formTitle: "Envianos un Mensaje",
    submitButton: "Contacta sin compromiso",
    successMessage: "Gracias por contactarnos. Te responderemos pronto.",
    info: [
      {
        icon: "MapPin",
        label: "Direccion",
        value: "C. Álamos Bda. los Almendros, 2-4, 29580, Estacion de Cártama, Málaga",
      },
      {
        icon: "Phone",
        label: "Telefono",
        value: "+34 619 44 70 28",
      },
   /*   {
        icon: "Mail",
        label: "Email",
        value: "info@nolimits.com",
      },*/
      {
        icon: "Clock",
        label: "Horario",
        value: "Lun - Vie: 9:00 - 21:00",
      },
    ],
    form: {
      name: {
        label: "Nombre Completo",
        placeholder: "Tu nombre",
      },
      email: {
        label: "Email",
        placeholder: "tu@email.com",
      },
      phone: {
        label: "Telefono",
        placeholder: "+34 600 000 000",
      },
      message: {
        label: "Mensaje",
        placeholder: "Cuentanos tus objetivos...",
      },
    },
  },

  // Footer
  footer: {
    copyright: "No Limits. Todos los derechos reservados.",
    socialLinks: [
      { icon: "Instagram", href: "#", label: "Instagram" },
      { icon: "Facebook", href: "#", label: "Facebook" },
      { icon: "Youtube", href: "#", label: "YouTube" },
    ],
    legalLinks: [
      { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
      { label: "Política de Privacidad", href: "/politica-de-privacidad" },
      { label: "Aviso Legal", href: "/aviso-legal" },
    ],
  },

  // WhatsApp
  whatsapp: {
    number: "34619447028",
    message: "Hola! Me gustaria obtener mas informacion sobre los entrenamientos.",
    ariaLabel: "Contactar por WhatsApp",
  },
}
