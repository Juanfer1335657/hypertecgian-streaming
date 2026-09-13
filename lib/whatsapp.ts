import { StreamingProduct, PlanDuration, CartItem, CurrencyCode } from '@/types';
import { formatPrice } from '@/data/currencies';

const DEFAULT_WHATSAPP_NUMBER = '573015851969';

export function getWhatsAppPhone(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
    return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function buildInfoWhatsAppUrl(message: string): string {
  const phone = getWhatsAppPhone();
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildSingleProductWhatsAppUrl(params: {
  product: StreamingProduct;
  durationMonths: PlanDuration;
  accountType: 'profile' | 'full';
  totalPriceUSD: number;
  currency: CurrencyCode;
}): string {
  const { product, durationMonths, accountType, totalPriceUSD, currency } = params;

  let message = `¡Hola Hypertecgian! 👋\nQuiero comprar el siguiente servicio de streaming:\n\n`;
  message += `📺 *Servicio:* ${product.name}\n`;
  message += `⏳ *Duración:* ${durationMonths} ${durationMonths === 1 ? 'mes' : 'meses'}\n`;
  message += `🔐 *Modalidad:* ${accountType === 'profile' ? 'Perfil Privado con PIN' : 'Cuenta Completa'}\n`;
  message += `🛡️ *Garantía:* Reposición activa por ${durationMonths * 30} días\n`;
  message += `💰 *Total a pagar:* ${formatPrice(totalPriceUSD, currency)}\n\n`;

  message += `¿Cuáles son los datos para realizar el pago (SPEI, OXXO, Tarjeta, Nequi, PayPal o USDT) y recibir el acceso de inmediato?`;

  const phone = getWhatsAppPhone();
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppUrl(params: {
  items: CartItem[];
  currency: CurrencyCode;
  finalTotalUSD: number;
}): string {
  const { items, currency, finalTotalUSD } = params;

  const orderNum = Math.floor(100000 + Math.random() * 900000);
  let message = `¡Hola Hypertecgian! 👋\nQuiero procesar mi pedido de suscripciones:\n\n`;
  message += `📋 *Pedido #SF-${orderNum}*\n`;
  message += `──────────────────────\n`;

  items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.product.name}*\n`;
    message += `   • Duración: ${item.durationMonths} ${item.durationMonths === 1 ? 'mes' : 'meses'}\n`;
    message += `   • Modalidad: ${item.accountType === 'profile' ? 'Perfil Privado (con PIN)' : 'Cuenta Completa'}\n`;
    message += `   • Cantidad: ${item.quantity}\n`;
    message += `   • Subtotal: ${formatPrice(item.unitPriceUSD * item.quantity, currency)}\n\n`;
  });

  message += `──────────────────────\n`;
  message += `💰 *Total a pagar:* ${formatPrice(finalTotalUSD, currency)}\n`;
  message += `🛡️ *Garantía:* Cuentas garantizadas durante todo el periodo\n\n`;
  message += `¿Cuáles son los datos de transferencia o pago disponibles para completar la compra y recibir los accesos?`;

  const phone = getWhatsAppPhone();
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppUrl(params: {
  orderId: string;
  customerName: string;
  customerContact?: string;
  paymentMethod: string;
  items: CartItem[];
  currency: CurrencyCode;
  totalUSD: number;
}): string {
  const { 
    orderId, 
    customerName, 
    customerContact, 
    paymentMethod, 
    items, 
    currency, 
    totalUSD
  } = params;

  let message = `¡Hola Hypertecgian! 👋 Acabo de generar un pedido en la tienda web:\n\n`;
  message += `🔖 *Folio:* ${orderId}\n`;
  message += `👤 *Nombre del Cliente:* ${customerName}\n`;
  if (customerContact && customerContact.trim()) {
    message += `📱 *Contacto:* ${customerContact.trim()}\n`;
  }
  message += `💳 *Método de Pago Elegido:* ${paymentMethod}\n\n`;

  message += `📦 *Productos Solicitados:* \n`;
  items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.product.name}*\n`;
    message += `   • Duración: ${item.durationMonths} ${item.durationMonths === 1 ? 'mes' : 'meses'}\n`;
    message += `   • Modalidad: ${item.accountType === 'profile' ? 'Perfil Privado (con PIN)' : 'Cuenta Completa'}\n`;
    message += `   • Cantidad: ${item.quantity}\n`;
    message += `   • Precio: ${formatPrice(item.unitPriceUSD * item.quantity, currency)}\n\n`;
  });

  message += `──────────────────────\n`;
  message += `💰 *TOTAL A PAGAR:* ${formatPrice(totalUSD, currency)}\n`;
  message += `──────────────────────\n\n`;
  message += `🛡️ *Garantía:* Cuentas garantizadas durante todo el periodo.\n`;
  message += `¿Me podrían compartir los datos correspondientes para pagar por *${paymentMethod}* y recibir mis accesos de inmediato?`;

  const phone = getWhatsAppPhone();
  const base = phone ? `https://wa.me/${phone}` : `https://wa.me/`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppUrl(url: string) {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
