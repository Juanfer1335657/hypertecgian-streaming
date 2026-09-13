'use client';

import React from 'react';
import { 
  ArrowRight, 
  Tv, 
  Headphones, 
  RadioTower, 
  CheckCircle2,
  Gift,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenRecommender: () => void;
  onSelectCategory: (cat: any) => void;
}

export default function HeroBanner({
  onExploreClick,
  onOpenRecommender,
  onSelectCategory
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 bg-black">
      
      {/* Subtle Monochrome Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-zinc-800/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 backdrop-blur-md cursor-pointer transition-colors animate-fade-down"
            onClick={() => onSelectCategory('combos')}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-semibold text-zinc-200 tracking-wide">
              Tarifas Especiales de Temporada · Hasta 70% Menos que el Precio Oficial
            </span>
          </div>
        </div>

        {/* Main Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white animate-fade-up"
          >
            Suscripciones Premium
            <br />
            <span className="text-zinc-400 font-light">
              Garantizadas & Soporte 24/7
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:100ms]"
          >
            Netflix, Disney+, HBO Max, Spotify, ChatGPT Plus y Canva Pro. Pantallas individuales privadas con PIN, garantía de reposición y soporte 24/7.
          </p>

          {/* Action CTAs */}
          <div
            className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-up [animation-delay:200ms]"
          >
            <button
              id="hero-explore-catalog-btn"
              onClick={onExploreClick}
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-900/40 transition-all cursor-pointer flex items-center space-x-2 active:scale-95"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              id="hero-combos-btn"
              onClick={() => onSelectCategory('combos')}
              className="px-5 sm:px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm sm:text-base border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex items-center space-x-2 active:scale-95"
            >
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>Combos con Netflix</span>
              <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-black">AHORRO</span>
            </button>

            <button
              id="hero-quiz-btn"
              onClick={onOpenRecommender}
              className="px-5 sm:px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm sm:text-base border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex items-center space-x-2 active:scale-95"
            >
              <Gift className="w-4 h-4 text-zinc-400" />
              <span>Test Recomendador</span>
            </button>
          </div>

          {/* Micro Promises */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-400">
            <span className="inline-flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Activación sujeta al tiempo de respuesta del proveedor</span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Perfiles privados con PIN</span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Garantía de reposición total</span>
            </span>
          </div>

        </div>

        {/* Dynamic Category Quick Jump Tiles */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          
          <button
            onClick={() => onSelectCategory('video')}
            className="group p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Tv className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-semibold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">4K HDR</span>
            </div>
            <p className="text-white font-bold text-sm">Series & Cine</p>
            <p className="text-zinc-500 text-xs mt-0.5">Netflix, Disney+, Max</p>
          </button>

          <button
            onClick={() => onSelectCategory('music')}
            className="group p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Headphones className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-semibold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">Hi-Fi</span>
            </div>
            <p className="text-white font-bold text-sm">Música & Audio</p>
            <p className="text-zinc-500 text-xs mt-0.5">Spotify Premium</p>
          </button>

          <button
            onClick={() => onSelectCategory('iptv')}
            className="group p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <RadioTower className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-semibold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">TV</span>
            </div>
            <p className="text-white font-bold text-sm">IPTV & TV en Vivo</p>
            <p className="text-zinc-500 text-xs mt-0.5">Win+, Magis TV</p>
          </button>

          <button
            onClick={() => onSelectCategory('combos')}
            className="group p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded">AHORRO</span>
            </div>
            <p className="text-white font-bold text-sm">Combos con Netflix</p>
            <p className="text-zinc-500 text-xs mt-0.5">X2, X3, X4 hasta Élite</p>
          </button>

        </div>

        {/* Guarantee Bar */}
        <div className="mt-10 pt-8 border-t border-zinc-900">
          <div className="max-w-md mx-auto p-4 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center gap-3">
            <ShieldCheck className="w-7 h-7 text-blue-400 shrink-0" />
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">
                100% Reposición
              </div>
              <div className="text-xs text-zinc-400 font-medium mt-0.5">
                Garantía activa durante todo el mes contratado
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
