'use client';

import React from 'react';
import { CurrencyCode } from '@/types';
import { CURRENCIES } from '@/data/currencies';
import { buildInfoWhatsAppUrl } from '@/lib/whatsapp';
import { 
  Tv, 
  ShoppingCart, 
  MessageCircle, 
  Compass,
  Search,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenRecommender: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenRecommender,
  searchQuery,
  onSearchChange
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 shrink-0">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-zinc-950 border border-zinc-700 group-hover:border-blue-500 group-hover:scale-105 transition-all">
                <Tv className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white">HYPER</span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-500">TECGIAN</span>
                </div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-zinc-500 -mt-1">
                  Cuentas & Suscripciones
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="navbar-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar Netflix, Spotify, ChatGPT..."
                className="w-full pl-10 pr-9 py-2 text-sm bg-zinc-900/90 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-1.5 py-0.5 rounded cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Tools & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Recommender Quiz Button */}
            <button
              id="navbar-recommender-btn"
              onClick={onOpenRecommender}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-zinc-400" />
              <span>Test Recomendador</span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <select
                id="navbar-currency-select"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="appearance-none bg-zinc-900 text-zinc-200 font-semibold text-xs py-2 pl-3 pr-7 rounded-xl border border-zinc-800 hover:border-zinc-600 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
              >
                {Object.values(CURRENCIES).map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-black text-white">
                    {curr.flag} {curr.code}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-zinc-500">
                ▼
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <a
              id="navbar-whatsapp-direct"
              href={buildInfoWhatsAppUrl('¡Hola Hypertecgian! Quiero información sobre las cuentas de streaming')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-xl transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Soporte 24/7</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              id="navbar-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 ? (
                <span
                  className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-black bg-black text-white rounded-full animate-pop"
                >
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] bg-zinc-200 text-black px-1.5 py-0.5 rounded-full font-medium">0</span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar Netflix, Spotify, Disney+..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
