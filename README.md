# StreamFlix - Tienda de Cuentas y Streaming

Tienda de suscripciones de streaming construida con Next.js 15, React 19 y Tailwind CSS 4.

## Requisitos

- Node.js 20+
- pnpm (recomendado, usa el lockfile del proyecto)

## Instalación y ejecución local

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000

## Variables de entorno

Copia `.env.example` a `.env.local` y configura la única variable necesaria:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de WhatsApp con código de país SIN `+` ni espacios. Ejemplo: `573001234567`. Se usa en todos los botones de WhatsApp de la tienda.

## Deploy en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel crea un proyecto nuevo y conecta el repositorio (Vercel detecta automáticamente Next.js y usa pnpm).
3. En **Project Settings → Environment Variables** agrega `NEXT_PUBLIC_WHATSAPP_NUMBER` con tu número.
4. Haz *Deploy*. La app se genera como página estática.# hypertecgian-streaming
