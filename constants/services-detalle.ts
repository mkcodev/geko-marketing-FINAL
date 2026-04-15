export interface ProcesoStep {
  num: string
  title: string
  description: string
}

import type { IconName } from "@/lib/icons"

export interface PortfolioItem {
  label: string
  metric: string
  metricNote: string
  sector: string
  color: string
  icon: IconName
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ServicioDetalle {
  slug: string
  heroHeadline: string
  heroAccent: string
  heroDescription: string
  proceso: ProcesoStep[]
  portfolio: PortfolioItem[]
  faq: FaqItem[]
}

export const SERVICIOS_DETALLE: Record<string, ServicioDetalle> = {
  "gestion-redes": {
    slug: "gestion-redes",
    heroHeadline: "Tu marca activa cada día",
    heroAccent: "en todas las plataformas",
    heroDescription:
      "Gestionamos tu presencia en redes sociales de forma integral: estrategia, creación de contenido, publicación, gestión de comunidad y campañas de pago. Todo para que tú solo te preocupes de atender a los clientes que lleguen.",
    proceso: [
      {
        num: "01",
        title: "Auditoría inicial",
        description:
          "Analizamos tu situación actual: seguidores, engagement, competidores y oportunidades del sector para definir el punto de partida.",
      },
      {
        num: "02",
        title: "Estrategia de contenido",
        description:
          "Planificamos el calendario editorial del primer mes con formatos, temas, frecuencia y horarios óptimos por plataforma.",
      },
      {
        num: "03",
        title: "Producción de contenido",
        description:
          "Creamos posts, reels, stories y copies optimizados para engagement, adaptados al tono y estética de tu marca.",
      },
      {
        num: "04",
        title: "Publicación y gestión",
        description:
          "Publicamos en los horarios de mayor actividad, respondemos comentarios y DMs, y gestionamos tu comunidad a diario.",
      },
      {
        num: "05",
        title: "Análisis y optimización",
        description:
          "Cada mes revisamos métricas, identificamos qué funciona y ajustamos la estrategia para mejorar resultados continuamente.",
      },
    ],
    portfolio: [
      {
        label: "Hostelería · Tres Cantos",
        metric: "+247%",
        metricNote: "engagement en 90 días",
        sector: "Restaurante",
        color: "#E1306C",
        icon: "UtensilsCrossed",
      },
      {
        label: "Comercio local · Madrid",
        metric: "×3.8",
        metricNote: "ROAS en Social Ads",
        sector: "Retail",
        color: "#9B4DBC",
        icon: "ShoppingBag",
      },
      {
        label: "Salud y bienestar · Norte Madrid",
        metric: "12.400",
        metricNote: "seguidores en 6 meses",
        sector: "Clínica",
        color: "#10B981",
        icon: "Heart",
      },
    ],
    faq: [
      {
        question: "¿Cuánto tiempo hasta ver resultados?",
        answer:
          "Los primeros resultados visibles (incremento de alcance y engagement) se notan en los primeros 30 días. Resultados sólidos en seguidores y leads generados suelen verse entre el mes 2 y el 3.",
      },
      {
        question: "¿Qué necesito para empezar?",
        answer:
          "Solo necesitamos acceso a tus perfiles de redes sociales y una videollamada inicial de 30 minutos para entender tu negocio. Nosotros nos encargamos del resto.",
      },
      {
        question: "¿Puedo cancelar en cualquier momento?",
        answer:
          "Sí. No hay permanencia mínima. Trabajamos mes a mes y puedes cancelar con 15 días de antelación sin penalización.",
      },
      {
        question: "¿En qué plataformas trabajáis?",
        answer:
          "Instagram, TikTok, LinkedIn, Facebook y YouTube. En función de tu sector y público, definimos juntos en qué plataformas tiene más sentido invertir esfuerzo.",
      },
      {
        question: "¿El contenido lo creáis vosotros o necesito enviaros material?",
        answer:
          "Creamos nosotros el contenido visual y el copy. Si tienes fotos o vídeos propios que quieras usar, los incorporamos. No es obligatorio.",
      },
    ],
  },

  "branding": {
    slug: "branding",
    heroHeadline: "Una marca que inspira confianza",
    heroAccent: "desde el primer vistazo",
    heroDescription:
      "Construimos o renovamos tu identidad de marca de forma completa: naming, logo, colores, tipografías, manual de uso y pack de templates. El resultado es una imagen coherente en todos los canales que atrae exactamente al cliente que quieres.",
    proceso: [
      {
        num: "01",
        title: "Discovery session",
        description:
          "Entendemos tu negocio, valores, público objetivo y competencia. Esta sesión es la base de todo lo que construiremos.",
      },
      {
        num: "02",
        title: "Concepto creativo",
        description:
          "Presentamos 3 direcciones creativas diferenciadas con moodboard, paleta de color y propuesta de naming si aplica.",
      },
      {
        num: "03",
        title: "Diseño y refinamiento",
        description:
          "Desarrollamos la dirección elegida hasta el último detalle — logo, variantes, colores, tipografías y elementos de apoyo.",
      },
      {
        num: "04",
        title: "Entrega de assets",
        description:
          "Todos los archivos en los formatos que necesitas: SVG, PNG, PDF, para web, print e RRSS. Listos para usar el mismo día.",
      },
      {
        num: "05",
        title: "Manual de marca",
        description:
          "Documentamos cómo usar tu nueva identidad: qué hacer y qué no hacer, para que todo tu equipo mantenga la coherencia.",
      },
    ],
    portfolio: [
      {
        label: "Sector salud · Madrid",
        metric: "+183%",
        metricNote: "reconocimiento de marca",
        sector: "Clínica estética",
        color: "#9B4DBC",
        icon: "Sparkles",
      },
      {
        label: "Inmobiliaria · Tres Cantos",
        metric: "6 sem.",
        metricNote: "rebrand completo entregado",
        sector: "Inmobiliaria",
        color: "#3B82F6",
        icon: "Home",
      },
      {
        label: "Hostelería · Norte Madrid",
        metric: "+92%",
        metricNote: "percepción de calidad",
        sector: "Restaurante",
        color: "#F59E0B",
        icon: "Wine",
      },
    ],
    faq: [
      {
        question: "¿Cuánto tarda un proyecto de branding completo?",
        answer:
          "Entre 4 y 6 semanas desde la discovery session hasta la entrega final, dependiendo de la complejidad del proyecto y la velocidad de feedback.",
      },
      {
        question: "¿Qué pasa si no me convence ninguna de las propuestas?",
        answer:
          "Incluimos hasta 2 rondas de revisión en cada fase. Si después de las revisiones no estás satisfecho, hablamos — siempre encontramos una solución.",
      },
      {
        question: "¿Hacéis solo logo o también identidad completa?",
        answer:
          "Hacemos identidad completa — no solo logo. El logo sin sistema de marca no sirve de mucho. Entregamos todo lo que necesitas para ser consistente en todos tus canales.",
      },
      {
        question: "¿El precio incluye el diseño de templates para redes?",
        answer:
          "Sí, el pack incluye 20+ plantillas editables para Instagram, LinkedIn y presentaciones. Tú o tu equipo podéis editarlas sin conocimientos de diseño.",
      },
    ],
  },

  "paginas-web": {
    slug: "paginas-web",
    heroHeadline: "Tu web más rápida,",
    heroAccent: "más bonita y que convierte",
    heroDescription:
      "Diseñamos y desarrollamos webs que combinan un diseño visual premium con rendimiento técnico máximo. El resultado: más visitas orgánicas, mejor primera impresión y más clientes que contactan.",
    proceso: [
      {
        num: "01",
        title: "Briefing y arquitectura",
        description:
          "Definimos juntos la estructura de la web, los objetivos de conversión y los casos de uso. Sin esta base, todo lo demás falla.",
      },
      {
        num: "02",
        title: "Diseño UI/UX",
        description:
          "Prototipamos en Figma y diseñamos cada pantalla antes de escribir una línea de código. Ves exactamente lo que vamos a construir.",
      },
      {
        num: "03",
        title: "Desarrollo",
        description:
          "Desarrollamos con Next.js o WordPress según el proyecto, con foco en velocidad, accesibilidad y estructura SEO desde el primer commit.",
      },
      {
        num: "04",
        title: "Testing y optimización",
        description:
          "Probamos en todos los dispositivos y navegadores, optimizamos Core Web Vitals y configuramos analytics antes del lanzamiento.",
      },
      {
        num: "05",
        title: "Lanzamiento y soporte",
        description:
          "Publicamos en tu dominio, configuramos Search Console y te acompañamos durante los primeros meses con soporte técnico incluido.",
      },
    ],
    portfolio: [
      {
        label: "Inmobiliaria · Tres Cantos",
        metric: "+312%",
        metricNote: "tráfico orgánico en 4 meses",
        sector: "Inmobiliaria",
        color: "#3B82F6",
        icon: "Building2",
      },
      {
        label: "Clínica · Madrid Norte",
        metric: "98/100",
        metricNote: "Google PageSpeed score",
        sector: "Salud",
        color: "#10B981",
        icon: "Zap",
      },
      {
        label: "E-commerce · Madrid",
        metric: "+68%",
        metricNote: "tasa de conversión",
        sector: "Tienda online",
        color: "#F59E0B",
        icon: "ShoppingCart",
      },
    ],
    faq: [
      {
        question: "¿Cuánto tarda en estar lista una web?",
        answer:
          "Webs corporativas: entre 4 y 8 semanas. E-commerce o proyectos con funcionalidades específicas: 8-12 semanas. Siempre dependiendo de la complejidad y la velocidad de aprobación de cada fase.",
      },
      {
        question: "¿Next.js o WordPress — cuál es mejor para mi caso?",
        answer:
          "Depende. Next.js para webs de alta performance, blogs con mucho tráfico o proyectos con funcionalidades custom. WordPress si necesitas editar contenido tú mismo sin tocar código. Te recomendamos la opción más adecuada en el briefing.",
      },
      {
        question: "¿El precio incluye el hosting y el dominio?",
        answer:
          "No están incluidos, pero te orientamos en la configuración y en qué proveedor contratar según tu caso. Normalmente el hosting cuesta entre 10 y 30€/mes.",
      },
      {
        question: "¿Qué pasa si quiero cambiar cosas después del lanzamiento?",
        answer:
          "Incluimos soporte técnico los primeros 3 meses. Cambios de contenido y pequeños ajustes están incluidos. Para proyectos de mayor envergadura, trabajamos con una tarifa de mantenimiento mensual.",
      },
      {
        question: "¿Hacéis también tiendas online?",
        answer:
          "Sí. Desarrollamos con Shopify, WooCommerce o soluciones custom en Next.js. La elección depende del volumen de productos y las integraciones que necesites.",
      },
    ],
  },
}
