'use client';

import React, { useState, useEffect } from 'react';
import { StreamingProduct, CurrencyCode } from '@/types';
import { PRODUCTS } from '@/data/products';
import { formatPrice, getProductPrice } from '@/data/currencies';
import { buildSingleProductWhatsAppUrl, openWhatsAppUrl } from '@/lib/whatsapp';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Check, 
  RotateCcw,
  ShoppingCart,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SmartRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onAddToCart: (product: StreamingProduct, duration: any, accountType: any) => void;
  onBuyNow?: (product: StreamingProduct, duration: any, accountType: any) => void;
}

export default function SmartRecommenderModal({
  isOpen,
  onClose,
  currency,
  onAddToCart,
  onBuyNow
}: SmartRecommenderModalProps) {
  const [step, setStep] = useState(1);
  const [contentPreference, setContentPreference] = useState('');
  const [userCount, setUserCount] = useState('');
  const [priority, setPriority] = useState('');
  const [recommendedProduct, setRecommendedProduct] = useState<StreamingProduct | null>(null);
  const [addedDirectly, setAddedDirectly] = useState(false);

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

  const handleCalculate = () => {
    let match: StreamingProduct | undefined;

    if (contentPreference === 'iptv') {
      match = PRODUCTS.find((p) => p.id === 'iptv-win-plus');
    } else if (contentPreference === 'anime') {
      match = PRODUCTS.find((p) => p.id === 'crunchyroll');
    } else if (contentPreference === 'music') {
      match = PRODUCTS.find((p) => p.id === 'spotify-premium');
    } else if (contentPreference === 'ai') {
      match = PRODUCTS.find((p) => p.id === 'chatgpt-plus');
    } else if (contentPreference === 'combos' || userCount === 'family' || priority === 'all_in_one') {
      match = PRODUCTS.find((p) => p.id === 'combo-elite' || p.id === 'netflix');
    } else if (contentPreference === 'movies') {
      match = PRODUCTS.find((p) => p.id === 'netflix');
    } else {
      match = PRODUCTS.find((p) => p.id === 'netflix');
    }

    setRecommendedProduct(match || PRODUCTS[0]);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setContentPreference('');
    setUserCount('');
    setPriority('');
    setRecommendedProduct(null);
  };

  const handleAddRecommended = () => {
    if (!recommendedProduct) return;
    onAddToCart(recommendedProduct, 1, 'profile');
    setAddedDirectly(true);
    setTimeout(() => {
      setAddedDirectly(false);
      onClose();
    }, 900);
  };

  const handleBuyRecommendedWhatsApp = () => {
    if (!recommendedProduct) return;
    if (onBuyNow) {
      onBuyNow(recommendedProduct, 1, 'profile');
      onClose();
      return;
    }
    const recommendedPrice = getProductPrice(recommendedProduct, 'profile', 1);
    const url = buildSingleProductWhatsAppUrl({
      product: recommendedProduct,
      durationMonths: recommendedPrice.months,
      accountType: 'profile',
      totalPriceUSD: recommendedPrice.totalPriceUSD,
      currency
    });
    openWhatsAppUrl(url);
  };

  return (
    <AnimatePresence>
      <div 
        id="smart-recommender-backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 30 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 text-white overflow-y-auto max-h-[92vh] sm:max-h-[88vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
            aria-label="Cerrar test"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-2 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Test Recomendador de Suscripciones</span>
          </div>

          {step <= 3 && (
            <div className="flex items-center space-x-1.5 mb-5">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-white' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-white' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-white' : 'bg-zinc-800'}`} />
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Paso 1: ¿Qué tipo de contenido prefieres?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'movies', label: 'Películas & Series', sub: 'Netflix, Disney+, HBO Max' },
                  { id: 'iptv', label: 'IPTV & TV en Vivo', sub: 'Win+, Magis TV' },
                  { id: 'anime', label: 'Anime & Simulcast', sub: 'Crunchyroll sin anuncios' },
                  { id: 'music', label: 'Música Premium', sub: 'Spotify sin anuncios' },
                  { id: 'ai', label: 'Diseño, IA & Estudio', sub: 'ChatGPT Plus, Canva Pro' },
                  { id: 'combos', label: 'Combos con Netflix', sub: 'Varias plataformas en un solo pago' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setContentPreference(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      contentPreference === opt.id
                        ? 'bg-white text-black border-white shadow-sm'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className={`text-xs mt-0.5 ${contentPreference === opt.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{opt.sub}</div>
                  </button>
                ))}
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  disabled={!contentPreference}
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm text-white flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Paso 2: ¿Cuántas pantallas o personas la usarán?
              </h3>
              <div className="space-y-2.5">
                {[
                  { id: 'solo', label: 'Solo para mí (1 Pantalla)', sub: 'Perfil privado exclusivo con tu PIN personal' },
                  { id: 'couple', label: 'Dos personas (2 Pantallas)', sub: 'Uso simultáneo en tu móvil y Smart TV' },
                  { id: 'family', label: 'Familiar / Compartida (4+ Pantallas)', sub: 'Cuenta completa para el hogar sin limitaciones' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setUserCount(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      userCount === opt.id
                        ? 'bg-white text-black border-white shadow-sm'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className={`text-xs mt-0.5 ${userCount === opt.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{opt.sub}</div>
                  </button>
                ))}
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-semibold hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  disabled={!userCount}
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm text-white flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Paso 3: ¿Cuál es tu máxima prioridad?
              </h3>
              <div className="space-y-2.5">
                {[
                  { id: 'savings', label: 'Máximo ahorro por mes', sub: 'Tarifa mensual más baja garantizada' },
                  { id: 'quality', label: 'Máxima Calidad 4K HDR & Dolby Atmos', sub: 'La mayor resolución sin pérdidas' },
                  { id: 'all_in_one', label: 'Todo en Uno (Megapack de servicios)', sub: 'El catálogo más grande en un solo pago' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPriority(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      priority === opt.id
                        ? 'bg-white text-black border-white shadow-sm'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className={`text-xs mt-0.5 ${priority === opt.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{opt.sub}</div>
                  </button>
                ))}
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-semibold hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  disabled={!priority}
                  onClick={handleCalculate}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm text-white flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Ver Recomendación</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {step === 4 && recommendedProduct && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 text-center">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-white border border-blue-500/40 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5 text-blue-400" />
                <span>Recomendación Personalizada</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {recommendedProduct.name}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                Basado en tus preferencias seleccionadas, este servicio te ofrece el mejor balance de catálogo y costo por pantalla.
              </p>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Precio:</span>
                  <span className="text-xl font-black text-white">
                    {formatPrice(getProductPrice(recommendedProduct, 'profile', 1).totalPriceUSD, currency)}
                  </span>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="flex items-center space-x-2 text-zinc-200">
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{recommendedProduct.screens}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-200">
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{recommendedProduct.quality}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 justify-center">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center space-x-1.5 border border-zinc-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir</span>
                </button>

                <button
                  onClick={handleAddRecommended}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{addedDirectly ? '¡Agregado!' : '+ Carrito'}</span>
                </button>

                <button
                  onClick={handleBuyRecommendedWhatsApp}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-blue-900/40 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Pedir por WhatsApp</span>
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
