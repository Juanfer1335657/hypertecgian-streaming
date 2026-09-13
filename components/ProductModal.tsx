'use client';

import React, { useState, useEffect } from 'react';
import { StreamingProduct, PlanDuration, CurrencyCode } from '@/types';
import { PLAN_DURATIONS } from '@/data/products';
import { formatPrice, getProductPrice } from '@/data/currencies';
import { buildSingleProductWhatsAppUrl, openWhatsAppUrl } from '@/lib/whatsapp';
import { 
  X, 
  Check, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Zap, 
  Tv, 
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: StreamingProduct | null;
  currency: CurrencyCode;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: StreamingProduct, duration: PlanDuration, accountType: 'profile' | 'full') => void;
  onBuyNow?: (product: StreamingProduct, duration: PlanDuration, accountType: 'profile' | 'full') => void;
}

export default function ProductModal({
  product,
  currency,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow
}: ProductModalProps) {
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>(1);
  const [accountType, setAccountType] = useState<'profile' | 'full'>('profile');
  const [justAdded, setJustAdded] = useState(false);

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

  if (!isOpen || !product) return null;

  const currentPlan = PLAN_DURATIONS.find((p) => p.months === selectedDuration) || PLAN_DURATIONS[0];
  const { totalPriceUSD, perMonthUSD, savingsUSD, months: effectiveMonths } = getProductPrice(
    product,
    accountType,
    selectedDuration
  );

  const handleAdd = () => {
    onAddToCart(product, selectedDuration, accountType);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectBuyWhatsApp = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedDuration, accountType);
      onClose();
      return;
    }
    const url = buildSingleProductWhatsAppUrl({
      product,
      durationMonths: selectedDuration,
      accountType,
      totalPriceUSD,
      currency
    });
    openWhatsAppUrl(url);
  };

  return (
    <AnimatePresence>
      <div 
        id="product-modal-backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 30 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-zinc-900 border-b border-zinc-800 relative">
            <button
              id="close-product-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
              {product.badge && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-blue-500 text-white uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                {product.rating} ({product.reviewCount} reseñas)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{product.name}</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg">{product.tagline}</p>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
            
            {/* Account Type Selector (if both options available) */}
            {product.accountOptions.hasProfileOption && product.accountOptions.hasFullAccountOption && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Modalidad de la cuenta:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAccountType('profile')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      accountType === 'profile'
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm">Perfil Privado (con PIN)</div>
                    <div className={`text-xs mt-0.5 ${accountType === 'profile' ? 'text-zinc-700' : 'text-zinc-500'}`}>
                      Uso personal exclusivo en 1 pantalla con tu propio PIN
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('full')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      accountType === 'full'
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm">Cuenta Completa (Familiar)</div>
                    <div className={`text-xs mt-0.5 ${accountType === 'full' ? 'text-zinc-700' : 'text-zinc-500'}`}>
                      Control total de todos los perfiles y pantallas contratadas
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Plan Duration Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Duración de la suscripción:
                </label>
                {currentPlan.discountPercent > 0 && (
                  <span className="text-xs font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                    Ahorro del {currentPlan.discountPercent}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.priceOptions && product.priceOptions.length > 0 ? (
                  product.priceOptions.length > 1 ? (
                    product.priceOptions.map((opt) => (
                      <button
                        key={opt.months}
                        type="button"
                        onClick={() => setSelectedDuration(opt.months)}
                        className={`col-span-1 sm:col-span-2 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDuration === opt.months
                            ? 'bg-white text-black border-white shadow-sm'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        <div className="text-sm font-bold">
                          {opt.months === 1 ? '1 Mes' : `${opt.months} Meses`}
                        </div>
                        <div className={`text-xs mt-0.5 font-medium ${selectedDuration === opt.months ? 'text-zinc-700' : 'text-zinc-500'}`}>
                          {formatPrice(opt.priceUSD, currency)}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 sm:col-span-4 p-3 rounded-xl border border-white bg-white text-black text-center shadow-sm">
                      <div className="text-sm font-bold">
                        {product.priceOptions[0].months} {'Meses'}
                      </div>
                      <div className="text-xs mt-0.5 text-zinc-700">
                        Precio total: {formatPrice(product.priceOptions[0].priceUSD, currency)}
                      </div>
                    </div>
                  )
                ) : (
                  PLAN_DURATIONS.map((plan) => (
                    <button
                      key={plan.months}
                      type="button"
                      onClick={() => setSelectedDuration(plan.months)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDuration === plan.months
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <div className="text-sm font-bold">{plan.label}</div>
                      <div className={`text-xs mt-0.5 font-medium ${selectedDuration === plan.months ? 'text-zinc-700' : 'text-zinc-500'}`}>
                        {plan.discountPercent > 0 ? `-${plan.discountPercent}% OFF` : 'Precio regular'}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* What is included */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-white" />
                Beneficios incluidos:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2 text-zinc-300">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatible Devices */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Dispositivos compatibles:
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.devices.map((device, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-medium"
                  >
                    <Tv className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{device}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery & Warranty guarantee */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start space-x-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold block text-sm">
                  Garantía de Reposición Total
                </strong>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  Cubre el 100% de los {effectiveMonths * 30} días contratados. Si se presenta alguna consulta técnica, te atendemos por WhatsApp de inmediato.
                </p>
              </div>
            </div>

          </div>

          {/* Sticky Bottom Action Bar with Direct WhatsApp Buy */}
          <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shrink-0">
            <div>
              <span className="text-xs text-zinc-400 font-medium">Total ({effectiveMonths} {effectiveMonths === 1 ? 'mes' : 'meses'}):</span>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {formatPrice(totalPriceUSD, currency)}
              </div>
              {savingsUSD > 0 && (
                <span className="text-xs text-zinc-400 font-semibold">
                  Ahorras {formatPrice(savingsUSD, currency)} vs precio estándar
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                title="Añadir a la lista para comprar varios servicios"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 text-zinc-300" />
                    <span>Añadir al Carrito</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectBuyWhatsApp}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-900/40 transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-black" />
                <span>Comprar por WhatsApp</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
