'use client';

import React, { useState } from 'react';
import { StreamingProduct, PlanDuration, CurrencyCode } from '@/types';
import { PLAN_DURATIONS } from '@/data/products';
import { formatPrice, getProductPrice } from '@/data/currencies';
import { buildSingleProductWhatsAppUrl, openWhatsAppUrl } from '@/lib/whatsapp';
import { 
  Check, 
  ShoppingCart, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

interface ProductCardProps {
  product: StreamingProduct;
  currency: CurrencyCode;
  onAddToCart: (product: StreamingProduct, duration: PlanDuration, accountType: 'profile' | 'full') => void;
  onOpenDetails: (product: StreamingProduct) => void;
  onBuyNow?: (product: StreamingProduct, duration: PlanDuration, accountType: 'profile' | 'full') => void;
}

export default function ProductCard({
  product,
  currency,
  onAddToCart,
  onOpenDetails,
  onBuyNow
}: ProductCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>(product.priceOptions?.[0]?.months || 1);
  const [accountType, setAccountType] = useState<'profile' | 'full'>('profile');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Selected plan metadata
  const currentPlan = PLAN_DURATIONS.find((p) => p.months === selectedDuration) || PLAN_DURATIONS[0];

  const { totalPriceUSD, savingsUSD } = getProductPrice(product, accountType, selectedDuration);

  const handleAdd = () => {
    onAddToCart(product, selectedDuration, accountType);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1400);
  };

  const handleDirectWhatsAppBuy = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedDuration, accountType);
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
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl overflow-hidden"
    >
      {/* Subtle Top Accent Divider */}
      <div className="h-1 w-full bg-zinc-800 group-hover:bg-zinc-600 transition-colors" />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.badge && (
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${product.badgeColor || 'bg-blue-500 text-white'}`}>
                {product.badge}
              </span>
            )}
            {product.isCombo && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                PACK AHORRO
              </span>
            )}
          </div>
        </div>

        {/* Product Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal line-clamp-2 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Combo includes pills */}
        {product.isCombo && product.comboItems && (
          <div className="mb-4 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-1.5">
              Incluye 3 suscripciones:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.comboItems.map((item, i) => (
                <span key={i} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Account Type Selector (if service supports both) */}
        {product.accountOptions.hasProfileOption && product.accountOptions.hasFullAccountOption && (
          <div className="mb-3.5">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex justify-between">
              <span>Modalidad:</span>
              <span className="text-zinc-400 text-[10px] lowercase">
                {accountType === 'profile' ? 'perfil con PIN' : 'cuenta completa'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setAccountType('profile')}
                className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  accountType === 'profile'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Perfil Privado (PIN)
              </button>
              <button
                type="button"
                onClick={() => setAccountType('full')}
                className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  accountType === 'full'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Cuenta Completa
              </button>
            </div>
          </div>
        )}

        {/* Plan Duration Selector (1M, 3M, 6M, 12M) */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
            <span>Duración:</span>
            {currentPlan.discountPercent > 0 && (
              <span className="text-white font-bold">
                {currentPlan.badge}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
            {product.priceOptions && product.priceOptions.length > 0 ? (
              product.priceOptions.length > 1 ? (
                product.priceOptions.map((opt) => (
                  <button
                    key={opt.months}
                    type="button"
                    onClick={() => setSelectedDuration(opt.months)}
                    className={`col-span-2 py-1.5 px-1 text-center rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                      selectedDuration === opt.months
                        ? 'bg-white text-black shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{opt.months === 1 ? '1 Mes' : `${opt.months} Meses`}</span>
                    <span className={`text-[9px] font-extrabold -mt-0.5 ${selectedDuration === opt.months ? 'text-zinc-700' : 'text-zinc-500'}`}>
                      {formatPrice(opt.priceUSD, currency)}
                    </span>
                  </button>
                ))
              ) : (
                <div className="col-span-4 py-1.5 px-1 text-center rounded-lg text-xs font-bold bg-white text-black shadow-sm flex items-center justify-center">
                  <span>
                    {product.priceOptions[0].months} {'Meses'} · {formatPrice(product.priceOptions[0].priceUSD, currency)}
                  </span>
                </div>
              )
            ) : (
              PLAN_DURATIONS.map((plan) => (
                <button
                  key={plan.months}
                  type="button"
                  onClick={() => setSelectedDuration(plan.months)}
                  className={`py-1.5 px-1 text-center rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    selectedDuration === plan.months
                      ? 'bg-white text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{plan.label}</span>
                  {plan.discountPercent > 0 && (
                    <span className={`text-[9px] font-extrabold -mt-0.5 ${selectedDuration === plan.months ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      -{plan.discountPercent}%
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Key Features preview */}
        <div className="space-y-1.5 mb-5 flex-1 text-xs text-zinc-300">
          <div className="flex items-center space-x-2 text-zinc-200 font-semibold">
            <Zap className="w-3.5 h-3.5 shrink-0 text-white" />
            <span>{product.screens}</span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-200 font-semibold">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-white" />
            <span>Calidad: {product.quality}</span>
          </div>
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Pricing Box */}
        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 mb-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-zinc-400 font-medium">
                Total ({selectedDuration} {selectedDuration === 1 ? 'mes' : 'meses'}):
              </span>
              <div className="flex items-baseline space-x-2 mt-0.5">
                <span className="text-2xl font-black text-white tracking-tight">
                  {formatPrice(totalPriceUSD, currency)}
                </span>
                {currentPlan.discountPercent > 0 && (
                  <span className="text-xs line-through text-zinc-500">
                    {formatPrice(totalPriceUSD + savingsUSD, currency)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {savingsUSD > 0 && (
            <div className="mt-2 text-[11px] text-zinc-300 font-bold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-center">
              Ahorro de {formatPrice(savingsUSD, currency)} en este plan
            </div>
          )}
        </div>

        {/* Action Buttons: Direct WhatsApp Buy, Details & Cart */}
        <div className="space-y-2">
          
          <button
            id={`buy-whatsapp-btn-${product.id}`}
            type="button"
            onClick={handleDirectWhatsAppBuy}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-900/40 transition-all cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Comprar por WhatsApp</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`details-btn-${product.id}`}
              type="button"
              onClick={() => onOpenDetails(product)}
              className="py-2.5 px-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              title="Ver especificaciones del servicio"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Detalles</span>
            </button>

            <button
              id={`add-cart-btn-${product.id}`}
              type="button"
              onClick={handleAdd}
              className="py-2.5 px-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>¡Agregado!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>+ Carrito</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Guarantee Micro Footer */}
      <div className="px-5 py-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center text-[11px] text-zinc-400">
        <div className="flex items-center space-x-1 text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
          <span>Activación sujeta a tiempos del proveedor</span>
        </div>
      </div>

    </div>
  );
}
