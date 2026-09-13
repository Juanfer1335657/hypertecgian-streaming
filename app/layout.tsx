import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Hypertecgian - Tienda de Cuentas y Streaming',
  description: 'Tienda digital con suscripciones de streaming, películas, música, IPTV e inteligencia artificial a precios accesibles, con garantía de reposición y soporte 24/7.',
  icons: {
    icon: '/icon.svg'
  },
  openGraph: {
    title: 'Hypertecgian - Tienda de Cuentas y Streaming',
    description: 'Tienda digital con suscripciones de streaming, películas, música, IPTV e inteligencia artificial a precios accesibles, con garantía de reposición y soporte 24/7.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypertecgian - Tienda de Cuentas y Streaming',
    description: 'Tienda digital con suscripciones de streaming, películas, música, IPTV e inteligencia artificial a precios accesibles, con garantía de reposición y soporte 24/7.',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}