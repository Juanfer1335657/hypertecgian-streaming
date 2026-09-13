'use client';

import React, { useState, useEffect } from 'react';
import { CartItem, CurrencyCode } from '@/types';
import { formatPrice } from '@/data/currencies';
import { buildCartWhatsAppUrl, openWhatsAppUrl } from '@/lib/whatsapp';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  MessageCircle, 
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  activePromoCode: string;
  onApplyPromoCode: (code: string) => boolean;
  onCheckout?: (promoCode: string, discountPercent: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  activePromoCode,
  onApplyPromoCode,
  onCheckout
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState(activePromoCode || '');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(
    activePromoCode ? { text: `Cupón ${activePromoCode} activo`, isError: false } : null
  );

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

  if (!isOpen) return null;

  // Calculate subtotal
  const subtotalUSD = items.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  // Discount
  let discountPercent = 0;
  if (activePromoCode.toUpperCase() === 'HYPER15') discountPercent = 15;
  if (activePromoCode.toUpperCase() === 'NEON2025' || activePromoCode.toUpperCase() === 'BLACK20') discountPercent = 20;
  if (activePromoCode.toUpperCase() === 'PROMO10' || activePromoCode.toUpperCase() === 'BIENVENIDO') discountPercent = 10;

  const discountAmountUSD = (subtotalUSD * discountPercent) / 100;
  const finalTotalUSD = Math.max(0, subtotalUSD - discountAmountUSD);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyPromoCode(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoMessage({ text: `Cupón ${promoInput.toUpperCase()} aplicado con éxito`, isError: false });
    } else {
      setPromoMessage({ text: 'Cupón no válido. Prueba HYPER15 o BLACK20', isError: true });
    }
  };

  const handleWhatsAppCheckout = () => {
    if (onCheckout) {
      onCheckout(activePromoCode, discountPercent);
      return;
    }
    const url = buildCartWhatsAppUrl({
      items,
      currency,
      activePromoCode: activePromoCode || undefined,
      discountPercent: discountPercent > 0 ? discountPercent : undefined,
      discountAmountUSD: discountAmountUSD > 0 ? discountAmountUSD : undefined,
      finalTotalUSD
    });
    openWhatsAppUrl(url);
  };

  return (
    <AnimatePresence>
      <div 
        id="cart-drawer-backdrop"
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col h-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Tu Carrito</h2>
                <span className="text-xs text-zinc-400">
                  {items.length} {items.length === 1 ? 'servicio agregado' : 'servicios agregados'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1"
                >
                  Vaciar
                </button>
              )}
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
                aria-label="Cerrar carrito"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Tu carrito está vacío</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
                    Selecciona tus servicios preferidos y haz tu pedido vía WhatsApp.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 transition-all flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.product.name}</h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded">
                          {item.durationMonths} {item.durationMonths === 1 ? 'Mes' : 'Meses'}
                        </span>
                        <span className="text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded">
                          {item.accountType === 'profile' ? 'Perfil Privado (PIN)' : 'Cuenta Completa'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-zinc-500 hover:text-white p-1 transition-colors cursor-pointer"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                        aria-label="Restar una unidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-white text-xs px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                        aria-label="Sumar una unidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="font-black text-sm text-white">
                        {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-900 space-y-3.5">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Código de cupón (HYPER15)"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-xl text-zinc-200 hover:text-white transition-colors cursor-pointer border border-zinc-700"
                  >
                    Aplicar
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] font-semibold ${promoMessage.isError ? 'text-zinc-400 underline' : 'text-zinc-300'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1 text-xs text-zinc-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-zinc-200 font-semibold">{formatPrice(subtotalUSD, currency)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-white font-semibold">
                    <span>Descuento cupón ({discountPercent}%):</span>
                    <span>-{formatPrice(discountAmountUSD, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total a Pagar:</span>
                  <span className="text-xl text-white font-black">
                    {formatPrice(finalTotalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Guarantee Micro Pill */}
              <div className="flex items-center space-x-1.5 text-[11px] text-zinc-300 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>Garantía de reposición activa durante todo el mes contratado</span>
              </div>

              {/* Primary Direct WhatsApp Action Button */}
              <div className="pt-1">
                <button
                  id="cart-checkout-whatsapp-btn"
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-900/40 transition-all cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>Comprar por WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-zinc-500 mt-2">
                  Se abrirá WhatsApp con el resumen listo para coordinar el pago y recibir la cuenta.
                </p>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
