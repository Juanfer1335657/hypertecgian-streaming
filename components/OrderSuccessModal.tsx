'use client';

import React, { useState, useEffect } from 'react';
import { PlacedOrder } from '@/types';
import { formatPrice } from '@/data/currencies';
import { buildOrderWhatsAppUrl, openWhatsAppUrl } from '@/lib/whatsapp';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  MessageCircle, 
  ShieldCheck, 
  Lock, 
  X,
  Sparkles,
  ExternalLink,
  User,
  CreditCard,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderSuccessModal({
  order,
  isOpen,
  onClose
}: OrderSuccessModalProps) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [orderSummaryCopied, setOrderSummaryCopied] = useState(false);

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

  if (!isOpen || !order) return null;

  const toggleReveal = (idx: number) => {
    setRevealedIndex(revealedIndex === idx ? null : idx);
  };

  const copyCredential = (credText: string, idx: number) => {
    navigator.clipboard.writeText(credText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const generateWhatsAppText = () => {
    let text = `¡Hola Hypertecgian! 👋 Acabo de generar un pedido en la web:\n\n`;
    text += `🔖 *Folio:* ${order.orderId}\n`;
    text += `👤 *Nombre del Cliente:* ${order.customerName}\n`;
    if (order.customerContact) {
      text += `📱 *Contacto:* ${order.customerContact}\n`;
    }
    text += `💳 *Método de Pago Elegido:* ${order.paymentMethod}\n\n`;
    text += `📦 *Productos:*\n`;
    order.items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* (${item.durationMonths} ${item.durationMonths === 1 ? 'mes' : 'meses'} - ${item.accountType === 'profile' ? 'Perfil PIN' : 'Cuenta Completa'}) x${item.quantity}\n`;
    });
    text += `\n💰 *Total:* ${formatPrice(order.total, order.currency)}\n`;
    text += `🛡️ *Garantía:* 100% Reposición activa\n`;
    text += `¿Me pueden enviar los datos para pagar y validar mis accesos?`;
    return text;
  };

  const handleCopyOrderSummary = () => {
    navigator.clipboard.writeText(generateWhatsAppText());
    setOrderSummaryCopied(true);
    setTimeout(() => setOrderSummaryCopied(false), 2000);
  };

  const handleReopenWhatsApp = () => {
    const url = buildOrderWhatsAppUrl({
      orderId: order.orderId,
      customerName: order.customerName,
      customerContact: order.customerContact,
      paymentMethod: order.paymentMethod,
      items: order.items,
      currency: order.currency,
      totalUSD: order.total,
      promoCode: order.promoCode,
      discountUSD: order.discountApplied
    });
    openWhatsAppUrl(url);
  };

  return (
    <AnimatePresence>
      <div 
        id="order-success-modal-backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 30 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 text-white overflow-y-auto max-h-[92vh] sm:max-h-[88vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Success Header */}
          <div className="text-center space-y-2 mb-6 pt-2">
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 text-white mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>¡Pedido Registrado y Enviado a WhatsApp!</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Orden #{order.orderId}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              Estimado(a) <strong className="text-white">{order.customerName}</strong>, tu orden ha sido generada y el resumen fue enviado para coordinar tu pago por <strong className="text-white">{order.paymentMethod}</strong>.
            </p>
          </div>

          {/* WhatsApp Primary Re-Open Action Banner */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">¿No se abrió WhatsApp automáticamente?</h4>
                <p className="text-xs text-zinc-400">Haz clic para abrir el chat con tu nombre, productos y método de pago listo.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReopenWhatsApp}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>Abrir WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Order Info Recap Box (Name, Payment Method, Products, Total) */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 mb-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Resumen de la Orden:
              </h4>
              <button
                type="button"
                onClick={handleCopyOrderSummary}
                className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                {orderSummaryCopied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                <span>{orderSummaryCopied ? '¡Copiado!' : 'Copiar para WhatsApp'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-0.5">
                  <User className="w-3 h-3" /> Nombre del Cliente:
                </div>
                <div className="font-bold text-white">{order.customerName}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-0.5">
                  <CreditCard className="w-3 h-3" /> Método de Pago:
                </div>
                <div className="font-bold text-white">{order.paymentMethod}</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs">
              <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-1.5">
                <Package className="w-3 h-3" /> Productos ({order.items.reduce((s, i) => s + i.quantity, 0)}):
              </div>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-zinc-300">
                    <div>
                      <span className="font-semibold text-white">{item.product.name}</span>
                      <span className="text-zinc-500 text-[11px] ml-1.5">
                        ({item.durationMonths} {item.durationMonths === 1 ? 'Mes' : 'Meses'} • {item.accountType === 'profile' ? 'Perfil PIN' : 'Cuenta Completa'})
                      </span>
                    </div>
                    <span className="font-mono text-white font-bold">
                      {formatPrice(item.unitPriceUSD * item.quantity, order.currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-zinc-800 flex justify-between items-center font-bold">
                <span className="text-zinc-300">Total a Pagar:</span>
                <span className="text-sm text-white">{formatPrice(order.total, order.currency)}</span>
              </div>
            </div>
          </div>

          {/* Direct Credentials Card Preview */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-white" />
              Tus Accesos Reservados:
            </h4>

            <div className="space-y-3">
              {order.credentials.map((cred, idx) => {
                const isRevealed = revealedIndex === idx;
                const isCopied = copiedIndex === idx;
                const credText = `Servicio: ${cred.service}\nUsuario: ${cred.user}\nContraseña: ${cred.pass}${cred.pin ? `\nPIN: ${cred.pin}` : ''}`;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white">{cred.service}</span>
                        <span className="text-[11px] text-zinc-400 ml-2 font-medium bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                          {cred.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => toggleReveal(idx)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700"
                          title={isRevealed ? 'Ocultar contraseña' : 'Ver contraseña'}
                        >
                          {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => copyCredential(credText, idx)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700"
                          title="Copiar datos"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block font-sans">Usuario / Email:</span>
                        <span className="text-zinc-200 font-medium select-all break-all">{cred.user}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block font-sans">Contraseña:</span>
                        <span className="text-white font-bold select-all">
                          {isRevealed ? cred.pass : '••••••••••••'}
                        </span>
                      </div>

                      {cred.pin && (
                        <div className="sm:col-span-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-500 uppercase font-sans">PIN de tu Perfil Privado:</span>
                          <span className="text-white font-black text-sm select-all">
                            {isRevealed ? cred.pin : '••••'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                      <span>Vigencia: <strong className="text-white">{cred.expiryDays} días</strong></span>
                      <span className="flex items-center gap-1 text-zinc-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" /> Garantía de reposición activa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReopenWhatsApp}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 font-semibold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Reenviar a WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-95"
            >
              Listo, Entendido
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
