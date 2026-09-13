'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartProps {
  itemCount: number;
  onClick: () => void;
}

export default function FloatingCart({ itemCount, onClick }: FloatingCartProps) {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <button
        id="floating-cart-btn"
        onClick={onClick}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-blue-400"
        title="Ver carrito"
        aria-label="Ver carrito"
      >
        <ShoppingCart className="w-6 h-6 text-white" />

        {itemCount > 0 && (
          <span
            key={itemCount}
            className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white animate-pop"
          >
            {itemCount}
          </span>
        )}

        {/* Tooltip on hover for desktop */}
        <span className="hidden sm:block absolute right-16 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-zinc-800">
          {itemCount > 0 ? 'Ver tu carrito' : 'Tu carrito está vacío'}
        </span>
      </button>
    </div>
  );
}