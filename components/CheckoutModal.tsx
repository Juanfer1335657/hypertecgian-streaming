'use client';

import React, { useState, useEffect } from 'react';
import { CartItem, CurrencyCode, PlacedOrder, OrderCredential } from '@/types';
import { formatPrice } from '@/data/currencies';
import { buildOrderWhatsAppUrl, openWhatsAppUrl } from '@/lib/whatsapp';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Building2,
  Smartphone,
  Coins,
  MessageCircle,
  Check,
  ShoppingBag,
  User,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  promoCode?: string;
  discountPercent: number;
  onOrderCompleted: (order: PlacedOrder) => void;
}

const PAYMENT_METHODS = [
  { 
    id: 'nequi', 
    label: 'Nequi', 
    icon: Smartphone, 
    desc: 'Pagos al instante desde la app Nequi' 
  },
  { 
    id: 'daviplata', 
    label: 'Daviplata', 
    icon: Smartphone, 
    desc: 'Pagos al instante desde la app Daviplata' 
  },
  { 
    id: 'pse', 
    label: 'PSE', 
    icon: Building2, 
    desc: 'Pago en línea desde tu banco' 
  },
  { 
    id: 'bancolombia', 
    label: 'Bancolombia / Transferencia Bancaria', 
    icon: Building2, 
    desc: 'Transferencia directa desde tu banco' 
  },
  { 
    id: 'card', 
    label: 'Tarjeta Débito / Crédito', 
    icon: CreditCard, 
    desc: 'Visa, Mastercard, American Express' 
  },
  { 
    id: 'efecty', 
    label: 'Efecty', 
    icon: Coins, 
    desc: 'Pago en efectivo depositando en Efecty' 
  },
];

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  currency,
  promoCode,
  discountPercent,
  onOrderCompleted
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState('nequi');
  const [errorValidation, setErrorValidation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || items.length === 0) return null;

  const subtotalUSD = items.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);
  const discountUSD = (subtotalUSD * discountPercent) / 100;
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethodId) || PAYMENT_METHODS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorValidation('Por favor ingresa tu nombre completo para continuar');
      return;
    }
    setErrorValidation('');
    setIsProcessing(true);

    const orderNumber = `SF-${Math.floor(100000 + Math.random() * 900000)}`;

    // Prepare credentials structure for instant record
    const credentials: OrderCredential[] = [];
    items.forEach((item) => {
      for (let q = 0; q < item.quantity; q++) {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const cleanServiceName = item.product.name.split(' ')[0].toLowerCase();
        
        credentials.push({
          service: item.product.name,
          type: item.accountType === 'profile' ? 'Perfil Privado con PIN' : 'Cuenta Completa Familiar',
          user: `acceso.${cleanServiceName}.${randomId}@hypertecgian.vip`,
          pass: `HT_${cleanServiceName.toUpperCase()}_${Math.floor(10000 + Math.random() * 90000)}!`,
          pin: item.accountType === 'profile' ? `${Math.floor(1000 + Math.random() * 9000)}` : undefined,
          screens: item.product.screens,
          expiryDays: item.durationMonths * 30
        });
      }
    });

    const placedOrder: PlacedOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('es-MX', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      customerName: customerName.trim(),
      customerContact: customerPhone.trim() || 'WhatsApp directo',
      paymentMethod: selectedMethod.label,
      items,
      currency,
      total: totalUSD,
      discountApplied: discountUSD,
      promoCode,
      credentials,
      status: 'completada'
    };

    // 1. Build structured WhatsApp URL with Name, Payment Method, Products and Totals
    const whatsappUrl = buildOrderWhatsAppUrl({
      orderId: orderNumber,
      customerName: customerName.trim(),
      customerContact: customerPhone.trim(),
      paymentMethod: selectedMethod.label,
      items,
      currency,
      totalUSD,
      promoCode,
      discountUSD
    });

    // 2. Open WhatsApp in new tab
    openWhatsAppUrl(whatsappUrl);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setIsProcessing(false);
      onOrderCompleted(placedOrder);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div 
        id="checkout-modal-backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 30 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-zinc-900 border-b border-zinc-800 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5 text-white" />
              <span>Checkout & Envío de Pedido</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Confirmar Compra
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Revisa tus productos, ingresa tu nombre, elige tu método de pago y envía el pedido a WhatsApp.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
            
            {/* 1. Review of Selected Products */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-white" />
                  1. Productos seleccionados ({items.reduce((s, i) => s + i.quantity, 0)}):
                </span>
                <span className="text-[11px] text-zinc-400 font-normal lowercase">
                  moneda: {currency}
                </span>
              </div>

              <div className="divide-y divide-zinc-800/80 max-h-40 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={item.cartItemId || idx} className="py-2.5 first:pt-1 last:pb-0 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{item.product.name}</span>
                        {item.quantity > 1 && (
                          <span className="text-xs bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded font-normal">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                        <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                          {item.durationMonths} {item.durationMonths === 1 ? 'Mes' : 'Meses'}
                        </span>
                        <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                          {item.accountType === 'profile' ? 'Perfil Privado (PIN)' : 'Cuenta Completa'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-white">
                        {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Customer Name & Contact */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-white" />
                2. Nombre de la persona:
              </h4>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">
                  Nombre completo del titular <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errorValidation) setErrorValidation('');
                  }}
                  placeholder="Ej. Juan Carlos Pérez"
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">
                  Número de WhatsApp / Teléfono (opcional):
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ej. +52 55 1234 5678 (con código de país)"
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              {errorValidation && (
                <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorValidation}</span>
                </div>
              )}
            </div>

            {/* 3. Payment Method Selection */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-white" />
                  3. Método de pago preferido:
                </h4>
                <span className="text-[11px] text-zinc-400">Selecciona uno</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethodId === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethodId(method.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start space-x-2.5 ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-black' : 'text-white'}`}>
                          {method.label}
                        </div>
                        <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                          {method.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Price & Guarantee Breakdown */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotalUSD, currency)}</span>
              </div>

              {discountUSD > 0 && (
                <div className="flex justify-between text-white font-semibold">
                  <span>Descuento cupón {promoCode ? `(${promoCode})` : ''} ({discountPercent}%):</span>
                  <span>-{formatPrice(discountUSD, currency)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-white pt-1.5 border-t border-zinc-800">
                <span>Total a Pagar:</span>
                <span className="text-base text-white">{formatPrice(totalUSD, currency)}</span>
              </div>
            </div>

            {/* Guarantee check */}
            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>Garantía de reposición activa durante todo el periodo adquirido</span>
            </div>

            {/* 5. Final WhatsApp Submission Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-md shadow-blue-900/40 transition-all cursor-pointer active:scale-95"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Preparando tu pedido...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-black" />
                    <span>Enviar Pedido por WhatsApp</span>
                  </div>
                )}
              </button>
              <p className="text-[11px] text-zinc-500 text-center mt-2">
                Se abrirá WhatsApp con tu nombre, método de pago y la lista de productos para concretar la entrega. Los tiempos de entrega dependen del proveedor de cada servicio.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
