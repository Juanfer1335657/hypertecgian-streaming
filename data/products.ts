import { StreamingProduct } from '@/types';

const COP_RATE = 3100;
const cop = (price: number) => Number((price / COP_RATE).toPrecision(15));

export const PRODUCTS: StreamingProduct[] = [
  // ============= PANTALLAS INDIVIDUALES =============
  // --- VIDEO & STREAMING ---
  {
    id: 'netflix',
    name: 'Netflix',
    tagline: 'Películas, series y documentales en 4K',
    category: 'video',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K según plan',
    popular: true,
    rating: 4.9,
    reviewCount: 1420,
    features: [
      'Pantalla individual privada por 30 días',
      'Activación sujeta al tiempo de respuesta del proveedor',
      'Garantía de reposición ante cualquier fallo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Laptop', 'Consolas'],
    inStock: true,
    stockCount: 30,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'disney-plus-premium',
    name: 'Disney+ Premium',
    tagline: 'Disney, Pixar, Marvel, Star Wars & ESPN',
    category: 'video',
    badge: '4K PREMIUM',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: '4K Ultra HD + HDR',
    popular: true,
    rating: 4.8,
    reviewCount: 980,
    features: [
      'Pantalla individual privada por 30 días',
      'Catálogo completo Disney+, Marvel, Star Wars y ESPN',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Mac', 'Consolas'],
    inStock: true,
    stockCount: 22,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'disney-plus-estandar',
    name: 'Disney+ Estándar',
    tagline: 'Disney, Pixar, Marvel y Star Wars',
    category: 'video',
    badge: 'ESTÁNDAR',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(15000),
    screens: '1 Pantalla Individual',
    quality: 'Full HD',
    rating: 4.7,
    reviewCount: 540,
    features: [
      'Pantalla individual privada por 30 días',
      'Catálogo completo en calidad Full HD',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Mac', 'Consolas'],
    inStock: true,
    stockCount: 25,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    tagline: 'HBO, Warner, DC y grandes estrenos',
    category: 'video',
    badge: 'PLAN PLATINO',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-800',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(13000),
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K según plan',
    rating: 4.9,
    reviewCount: 860,
    features: [
      'Pantalla individual privada por 30 días',
      'Todo el catálogo de HBO, Warner y DC',
      'Soporte técnico rápido 24/7'
    ],
    devices: ['Smart TV', 'Smartphone', 'Computadora', 'Chromecast'],
    inStock: true,
    stockCount: 19,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime',
    tagline: 'Prime Video, música y beneficios Prime',
    category: 'video',
    badge: 'PRIME',
    badgeColor: 'bg-zinc-900 text-zinc-100 border border-zinc-700',
    gradientFrom: 'from-zinc-400',
    gradientTo: 'to-zinc-800',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(15000),
    priceOptions: [
      { months: 1, priceUSD: cop(15000) },
      { months: 6, priceUSD: cop(30000) }
    ],
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K según plan',
    rating: 4.7,
    reviewCount: 650,
    features: [
      'Pantalla individual privada por 30 días',
      'Prime Video, Prime Music y beneficios exclusivos',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Smart TV', 'Fire TV Stick', 'Móvil', 'PC'],
    inStock: true,
    stockCount: 31,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    tagline: 'Cine, series y deportes en vivo',
    category: 'video',
    badge: 'CINE Y SERIES',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: 'Full HD / 4K',
    rating: 4.6,
    reviewCount: 420,
    features: [
      'Pantalla individual privada por 30 días',
      'Películas, series y deportes en vivo',
      'Garantía de reposición durante el periodo contratado'
    ],
    devices: ['Smart TV', 'Android / iOS', 'PC', 'Consolas'],
    inStock: true,
    stockCount: 15,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    tagline: 'Todo el anime del mundo sin anuncios',
    category: 'video',
    badge: 'ANIME TOTAL',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(13000),
    screens: '1 Pantalla Individual',
    quality: '1080p Full HD',
    rating: 4.9,
    reviewCount: 910,
    features: [
      'Pantalla individual privada por 30 días',
      'Estrenos simultáneos con Japón (Simulcast)',
      'Anime sin anuncios y en alta calidad'
    ],
    devices: ['Smart TV', 'Smartphone', 'PC', 'PlayStation', 'Switch'],
    inStock: true,
    stockCount: 27,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'vix-premium',
    name: 'Vix Premium',
    tagline: 'Series, películas y deportes en español',
    category: 'video',
    badge: 'PREMIUM',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(13000),
    screens: '1 Pantalla Individual',
    quality: 'HD',
    rating: 4.5,
    reviewCount: 380,
    features: [
      'Pantalla individual privada por 30 días',
      'Fútbol en vivo, series y películas',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Web'],
    inStock: true,
    stockCount: 26,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'plex',
    name: 'Plex',
    tagline: 'Streaming, contenido en vivo y acceso premium',
    category: 'video',
    badge: 'PLEX PRO',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(17000),
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K',
    rating: 4.6,
    reviewCount: 310,
    features: [
      'Pantalla individual privada por 30 días',
      'Contenido en vivo y funciones premium',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Mac', 'Roku'],
    inStock: true,
    stockCount: 18,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'universal',
    name: 'Universal',
    tagline: 'Cine y series de Universal Pictures',
    category: 'video',
    badge: 'UNIVERSAL',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K',
    rating: 4.6,
    reviewCount: 260,
    features: [
      'Pantalla individual privada por 30 días',
      'Películas y series de Universal Pictures',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Web'],
    inStock: true,
    stockCount: 16,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    tagline: 'Cero anuncios y reproducción en segundo plano',
    category: 'video',
    badge: 'FAVORITO',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-100',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: 'Tu propia cuenta',
    quality: '1080p Premium / 4K',
    popular: true,
    rating: 5.0,
    reviewCount: 1650,
    features: [
      'Se activa directo en tu correo personal de Gmail',
      'Incluye YouTube Music Premium',
      'Cero anuncios y pantalla apagada en el móvil'
    ],
    devices: ['Todos tus dispositivos vinculados a tu Gmail'],
    inStock: true,
    stockCount: 40,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    tagline: 'Producciones originales galardonadas',
    category: 'video',
    badge: '4K HDR',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-400',
    gradientTo: 'to-zinc-800',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: '4K Dolby Vision',
    rating: 4.8,
    reviewCount: 380,
    features: [
      'Pantalla individual privada por 30 días',
      'Producciones originales de Apple',
      'Válido únicamente para TV y navegador'
    ],
    devices: ['Smart TV', 'Navegador (PC / Mac)'],
    inStock: true,
    stockCount: 11,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'mubi',
    name: 'MUBI',
    tagline: 'Cine de autor y películas seleccionadas',
    category: 'video',
    badge: 'CINE CLÁSICO',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(15000),
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K',
    rating: 4.7,
    reviewCount: 210,
    features: [
      'Pantalla individual privada por 30 días',
      'Catálogo curado de cine de autor',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'Celular & Tablet', 'PC / Web'],
    inStock: true,
    stockCount: 14,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- IPTV & TV EN VIVO ---
  {
    id: 'iptv-win-plus',
    name: 'IPTV con Win+',
    tagline: 'Canales en vivo, deportes y películas',
    category: 'iptv',
    badge: 'IPTV',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: 'HD / FHD',
    popular: true,
    rating: 4.7,
    reviewCount: 520,
    features: [
      'Pantalla individual privada por 30 días',
      'Canales en vivo, deportes y películas',
      'Incluye acceso a Win+ con reproducción estable'
    ],
    devices: ['Smart TV', 'TV Box', 'Celular & Tablet', 'PC / Web'],
    inStock: true,
    stockCount: 20,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'win-plus-original',
    name: 'Win+ Original',
    tagline: 'Experiencia original Win+ con catálogo completo',
    category: 'iptv',
    badge: 'ORIGINAL',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-800',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(32000),
    screens: '1 Pantalla Individual',
    quality: 'HD / 4K',
    rating: 4.8,
    reviewCount: 340,
    features: [
      'Pantalla individual privada por 30 días',
      'Catálogo completo y estable con accesos originales',
      'Soporte prioritario incluido'
    ],
    devices: ['Smart TV', 'TV Box', 'Celular & Tablet', 'PC / Web'],
    inStock: true,
    stockCount: 12,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'magis-tv',
    name: 'Magis TV',
    tagline: 'Canales en vivo y películas en HD',
    category: 'iptv',
    badge: 'MAGIS',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Pantalla Individual',
    quality: 'HD / FHD',
    rating: 4.6,
    reviewCount: 290,
    features: [
      'Pantalla individual privada por 30 días',
      'Canales en vivo y contenido bajo demanda',
      'Garantía de reposición durante el periodo'
    ],
    devices: ['Smart TV', 'TV Box', 'Android', 'PC / Web'],
    inStock: true,
    stockCount: 22,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- MÚSICA ---
  {
    id: 'spotify-premium',
    name: 'Spotify Premium',
    tagline: 'Música ilimitada sin anuncios y offline',
    category: 'music',
    badge: 'MÚSICA TOP',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    priceOptions: [
      { months: 1, priceUSD: cop(19000) },
      { months: 12, priceUSD: cop(40000) }
    ],
    screens: '1 Usuario',
    quality: 'Audio Muy Alto 320 kbps',
    popular: true,
    rating: 4.9,
    reviewCount: 2100,
    features: [
      'Se activa en tu cuenta personal existente',
      'Música ilimitada sin anuncios y saltos ilimitados',
      'Descargas offline para escuchar sin internet',
      'Incluye plan de 1 año a precio especial'
    ],
    devices: ['Celular', 'PC / Mac', 'Smart TV', 'Alexa / Home'],
    inStock: true,
    stockCount: 50,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- IA & PRODUCTIVIDAD ---
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    tagline: 'Acceso a los mejores modelos de OpenAI',
    category: 'ai',
    badge: 'IA AVANZADA',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: '1 Perfil / Compartida VIP',
    quality: 'GPT-4o y modelos avanzados',
    popular: true,
    rating: 4.9,
    reviewCount: 1100,
    features: [
      'Respuestas rápidas sin límites en horas pico',
      'Modo de voz avanzado y navegación web',
      'Análisis de datos, código e imágenes'
    ],
    devices: ['Web', 'App iOS / Android', 'Mac & Windows'],
    inStock: true,
    stockCount: 15,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    tagline: 'Diseña como profesional con recursos premium',
    category: 'ai',
    badge: 'DISEÑO PRO',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    priceOptions: [
      { months: 1, priceUSD: cop(19000) },
      { months: 12, priceUSD: cop(15000) }
    ],
    screens: 'En tu propio correo',
    quality: '100M+ Recursos Premium',
    popular: true,
    rating: 5.0,
    reviewCount: 1850,
    features: [
      'Plan de 1 año a precio especial',
      'Se activa como miembro Pro en tu email habitual',
      'Quitador de fondos y redimensión con IA',
      'Exportación en PNG transparente y SVG'
    ],
    devices: ['Móvil', 'Tablet', 'Computadora Web y App'],
    inStock: true,
    stockCount: 45,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'capcut-pro',
    name: 'CapCut Pro',
    tagline: 'Edición de video profesional sin límites',
    category: 'ai',
    badge: 'EDICIÓN PRO',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    priceOptions: [
      { months: 1, priceUSD: cop(19000) },
      { months: 6, priceUSD: cop(70000) }
    ],
    screens: 'En tu cuenta personal',
    quality: 'Funciones Pro ilimitadas',
    rating: 4.8,
    reviewCount: 730,
    features: [
      'Plan de 6 meses a precio especial',
      'Funciones Pro de edición sin restricciones',
      'Efectos, plantillas y recursos exclusivos',
      'Ideal para creadores de contenido'
    ],
    devices: ['Android', 'iOS', 'Windows / Mac'],
    inStock: true,
    stockCount: 34,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'gemini',
    name: 'Gemini',
    tagline: 'Asistente de IA de Google con los mejores modelos',
    category: 'ai',
    badge: 'IA GOOGLE',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(19000),
    screens: 'En tu cuenta Google',
    quality: 'Modelos avanzados de Google',
    rating: 4.7,
    reviewCount: 460,
    features: [
      'Se activa en tu cuenta de Google personal',
      'Modelos avanzados para texto, código y análisis',
      'Integrado con Gmail, Docs y Workspace'
    ],
    devices: ['Web', 'Android / iOS'],
    inStock: true,
    stockCount: 28,
    accountOptions: {
      hasProfileOption: true,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // ============= PLANES MULTIMESES =============
  {
    id: 'manus-pro',
    name: 'Manus Pro',
    tagline: 'Agente de Inteligencia Artificial autónomo',
    category: 'ai',
    badge: 'IA AGENTE',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(150000),
    priceOptions: [{ months: 12, priceUSD: cop(150000) }],
    screens: 'Acceso a la plataforma',
    quality: 'Agente IA de uso profesional',
    rating: 4.9,
    reviewCount: 320,
    features: [
      'Plan anual de Manus Pro',
      'Agente de IA autónomo para tareas complejas',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Web'],
    inStock: true,
    stockCount: 12,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'figma-pro-edu',
    name: 'Figma Pro (EDU)',
    tagline: 'Diseño de interfaces y prototipos sin límites',
    category: 'ai',
    badge: '1 AÑO',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(30000),
    priceOptions: [{ months: 12, priceUSD: cop(30000) }],
    screens: 'Cuenta EDU',
    quality: 'Funciones Pro de Figma',
    rating: 4.8,
    reviewCount: 150,
    features: [
      'Licencia EDU por 1 año',
      'Equipos, bibliotecas y prototipos ilimitados',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Web', 'Windows / Mac'],
    inStock: true,
    stockCount: 18,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'wispr-flow-pro',
    name: 'Wispr Flow Pro',
    tagline: 'Dictado inteligente con IA para escribir más rápido',
    category: 'ai',
    badge: '12 MESES',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(60000),
    priceOptions: [{ months: 12, priceUSD: cop(60000) }],
    screens: 'Cuenta personal',
    quality: 'Dictado inteligente con IA',
    rating: 4.7,
    reviewCount: 95,
    features: [
      'Plan de 12 meses',
      'Dictado por voz con IA en cualquier aplicación',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Web', 'Windows / Mac', 'iOS / Android'],
    inStock: true,
    stockCount: 20,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'office-365-personal',
    name: 'Microsoft Office 365 Personal',
    tagline: 'Word, Excel, PowerPoint y 1 TB en la nube',
    category: 'ai',
    badge: '1 AÑO',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(30000),
    priceOptions: [{ months: 12, priceUSD: cop(30000) }],
    screens: '1 cuenta personal',
    quality: 'Office + 1 TB OneDrive',
    rating: 4.9,
    reviewCount: 410,
    features: [
      'Suscripción de 1 año',
      'Word, Excel, PowerPoint, Outlook y 1 TB en OneDrive',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Windows / Mac', 'Móvil', 'Tablet', 'Web'],
    inStock: true,
    stockCount: 40,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'correo-uned',
    name: 'Correo UNED',
    tagline: 'Beneficios de estudiante con correo institucional',
    category: 'ai',
    badge: 'STUDENT',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(15000),
    priceOptions: [{ months: 12, priceUSD: cop(15000) }],
    screens: 'Correo institucional',
    quality: 'Beneficios de estudiante',
    rating: 4.5,
    reviewCount: 60,
    features: [
      'Acceso a correo con beneficios estudiantiles',
      'Vigencia de 1 año',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Web', 'Móvil'],
    inStock: true,
    stockCount: 35,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'framer-pro',
    name: 'Framer Pro',
    tagline: 'Diseño y desarrollo web sin código',
    category: 'ai',
    badge: '12 MESES',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(70000),
    priceOptions: [{ months: 12, priceUSD: cop(70000) }],
    screens: 'Cuenta Pro',
    quality: 'Publicación ilimitada Framer',
    rating: 4.8,
    reviewCount: 120,
    features: [
      'Plan de 12 meses',
      'Publica sitios web sin límites',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Web', 'Windows / Mac'],
    inStock: true,
    stockCount: 16,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'gamma-pro',
    name: 'Gamma Pro',
    tagline: 'Presentaciones y documentos generados con IA',
    category: 'ai',
    badge: '12 MESES',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.05)',
    basePriceUSD: cop(90000),
    priceOptions: [{ months: 12, priceUSD: cop(90000) }],
    screens: 'Cuenta Pro',
    quality: 'Presentaciones con IA',
    rating: 4.7,
    reviewCount: 88,
    features: [
      'Plan de 12 meses',
      'Presentaciones, documentos y webs con IA',
      'Garantía de reposición durante el periodo contratado',
      'Activación sujeta al tiempo de respuesta del proveedor'
    ],
    devices: ['Web', 'Móvil'],
    inStock: true,
    stockCount: 22,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // ============= COMBOS CON NETFLIX =============
  // --- COMBOS X 2 ---
  {
    id: 'combo-2-1',
    name: 'Combo Netflix + Disney+',
    tagline: 'Netflix + Disney+ Premium',
    category: 'combos',
    badge: 'COMBO X 2',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.06)',
    basePriceUSD: cop(32000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium'],
    rating: 5.0,
    reviewCount: 640,
    features: [
      '2 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 20,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-2-2',
    name: 'Combo Netflix + Prime',
    tagline: 'Netflix + Amazon Prime',
    category: 'combos',
    badge: 'COMBO X 2',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.06)',
    basePriceUSD: cop(29000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Amazon Prime'],
    rating: 4.9,
    reviewCount: 420,
    features: [
      '2 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 18,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-2-3',
    name: 'Combo Netflix + HBO Max',
    tagline: 'Netflix + HBO Max',
    category: 'combos',
    badge: 'COMBO X 2',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.06)',
    basePriceUSD: cop(29000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'HBO Max'],
    rating: 4.9,
    reviewCount: 510,
    features: [
      '2 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 21,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-2-4',
    name: 'Combo Netflix + Paramount+',
    tagline: 'Netflix + Paramount+',
    category: 'combos',
    badge: 'COMBO X 2',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.06)',
    basePriceUSD: cop(32000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Paramount+'],
    rating: 4.8,
    reviewCount: 260,
    features: [
      '2 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 16,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-2-5',
    name: 'Combo Netflix + Vix',
    tagline: 'Netflix + Vix Premium',
    category: 'combos',
    badge: 'COMBO X 2',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.06)',
    basePriceUSD: cop(27000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Vix Premium'],
    rating: 4.8,
    reviewCount: 190,
    features: [
      '2 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 17,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-2-6',
    name: 'Combo Netflix + Crunchyroll',
    tagline: 'Netflix + Crunchyroll',
    category: 'combos',
    badge: 'COMBO X 2',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.06)',
    basePriceUSD: cop(27000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Crunchyroll'],
    rating: 4.9,
    reviewCount: 230,
    features: [
      '2 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 19,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- COMBOS X 3 ---
  {
    id: 'combo-3-1',
    name: 'Combo Netflix + Prime + HBO',
    tagline: 'Netflix + Amazon Prime + HBO Max',
    category: 'combos',
    badge: 'COMBO X 3',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.07)',
    basePriceUSD: cop(35000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Amazon Prime', 'HBO Max'],
    rating: 5.0,
    reviewCount: 480,
    features: [
      '3 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 14,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-3-2',
    name: 'Combo Netflix + Disney+ + Prime',
    tagline: 'Netflix + Disney+ Premium + Amazon Prime',
    category: 'combos',
    badge: 'COMBO X 3',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-100',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.07)',
    basePriceUSD: cop(39000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime'],
    rating: 5.0,
    reviewCount: 560,
    features: [
      '3 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 15,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-3-3',
    name: 'Combo Netflix + Disney+ + HBO',
    tagline: 'Netflix + Disney+ Premium + HBO Max',
    category: 'combos',
    badge: 'COMBO X 3',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.07)',
    basePriceUSD: cop(38000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'HBO Max'],
    rating: 5.0,
    reviewCount: 590,
    features: [
      '3 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 16,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- COMBOS X 4 ---
  {
    id: 'combo-4-1',
    name: 'Combo Netflix + Disney+ + Prime + HBO',
    tagline: 'Netflix + Disney+ + Prime + HBO Max',
    category: 'combos',
    badge: 'COMBO X 4',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.07)',
    basePriceUSD: cop(45000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime', 'HBO Max'],
    rating: 5.0,
    reviewCount: 610,
    features: [
      '4 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 13,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-4-2',
    name: 'Combo Netflix + Disney+ + Prime + Plex',
    tagline: 'Netflix + Disney+ + Prime + Plex',
    category: 'combos',
    badge: 'COMBO X 4',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-300',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.07)',
    basePriceUSD: cop(47000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime', 'Plex'],
    rating: 4.9,
    reviewCount: 210,
    features: [
      '4 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 11,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },
  {
    id: 'combo-4-3',
    name: 'Combo Netflix + Disney+ + Prime + Crunchyroll/Vix',
    tagline: 'Netflix + Disney+ + Prime + Crunchyroll o Vix',
    category: 'combos',
    badge: 'COMBO X 4',
    badgeColor: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
    gradientFrom: 'from-zinc-200',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.07)',
    basePriceUSD: cop(45000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime', 'Crunchyroll / Vix'],
    rating: 4.9,
    reviewCount: 175,
    features: [
      '4 plataformas con opción de Crunchyroll o Vix',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 12,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- COMBO X 5 ---
  {
    id: 'combo-5',
    name: 'Combo Netflix + Disney+ + Prime + HBO + Vix',
    tagline: '5 plataformas en un solo combo',
    category: 'combos',
    badge: 'COMBO X 5',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.08)',
    basePriceUSD: cop(52000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime', 'HBO Max', 'Vix Premium'],
    rating: 5.0,
    reviewCount: 420,
    features: [
      '5 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 10,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- COMBO X 6 ---
  {
    id: 'combo-6',
    name: 'Combo Netflix + Disney+ + Prime + HBO + Plex + Vix',
    tagline: '6 plataformas en un solo combo',
    category: 'combos',
    badge: 'COMBO X 6',
    badgeColor: 'bg-blue-500 text-white font-bold',
    gradientFrom: 'from-zinc-100',
    gradientTo: 'to-zinc-700',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.08)',
    basePriceUSD: cop(58000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime', 'HBO Max', 'Plex', 'Vix Premium'],
    rating: 5.0,
    reviewCount: 380,
    features: [
      '6 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 9,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  },

  // --- COMBO ÉLITE ---
  {
    id: 'combo-elite',
    name: 'Combo Élite',
    tagline: '8 plataformas premium en un solo pago',
    category: 'combos',
    badge: 'COMBO ÉLITE',
    badgeColor: 'bg-blue-500 text-white font-extrabold',
    gradientFrom: 'from-white',
    gradientTo: 'to-zinc-600',
    accentColor: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.09)',
    basePriceUSD: cop(72000),
    screens: '1 pantalla en cada plataforma',
    quality: 'HD / 4K según plataforma',
    popular: true,
    isCombo: true,
    comboItems: ['Netflix', 'Disney+ Premium', 'Amazon Prime', 'HBO Max', 'Plex', 'Crunchyroll', 'Vix Premium', 'Paramount+'],
    rating: 5.0,
    reviewCount: 720,
    features: [
      '8 plataformas al mejor precio combinado',
      'Pantallas individuales privadas por 30 días',
      'Garantía de reposición en cada servicio'
    ],
    devices: ['Smart TV', 'Celular', 'Tablet', 'Computadora'],
    inStock: true,
    stockCount: 8,
    accountOptions: {
      hasProfileOption: false,
      hasFullAccountOption: false,
      profileDiscountFactor: 1.0
    }
  }
];

export const PLAN_DURATIONS = [
  { months: 1 as const, label: '1 Mes', discountPercent: 0, badge: 'Estándar' }
];

export const CATEGORIES = [
  { id: 'all' as const, label: 'Todos los Servicios', icon: 'Sparkles', count: 43 },
  { id: 'video' as const, label: 'Series & Películas', icon: 'Tv', count: 13 },
  { id: 'iptv' as const, label: 'IPTV & TV en Vivo', icon: 'RadioTower', count: 3 },
  { id: 'music' as const, label: 'Música', icon: 'Music', count: 1 },
  { id: 'ai' as const, label: 'IA & Productividad', icon: 'Bot', count: 11 },
  { id: 'combos' as const, label: 'Combos con Netflix', icon: 'Flame', count: 15 }
];

