'use client';

import React from 'react';
import { Tv, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-zinc-950 flex items-center justify-center text-white">
                <Tv className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="text-white">HYPER</span>
                <span className="text-blue-500">TECGIAN</span>
              </span>
            </div>

            <p className="text-zinc-400 max-w-sm text-xs leading-relaxed">
              Plataforma para la adquisición de suscripciones digitales, streaming, IPTV e inteligencia artificial. Tiempos de entrega según la respuesta del proveedor y garantía de reposición.
            </p>

            <div className="flex items-center space-x-2 text-zinc-300 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Garantía de reposición activa durante todo el periodo contratado</span>
            </div>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Categorías Principales</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><a href="#catalogo" className="hover:text-blue-400 transition-colors">Series y Películas</a></li>
              <li><a href="#catalogo" className="hover:text-blue-400 transition-colors">Música: Spotify Premium</a></li>
              <li><a href="#catalogo" className="hover:text-blue-400 transition-colors">IPTV & TV en Vivo</a></li>
              <li><a href="#catalogo" className="hover:text-blue-400 transition-colors">IA & Productividad</a></li>
              <li><a href="#catalogo" className="hover:text-blue-400 transition-colors">Combos con Netflix</a></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Métodos de Pago</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Nequi', 'Daviplata', 'PSE', 'Bancolombia', 'Visa / Mastercard', 'Efecty'].map((pm) => (
                <span key={pm} className="px-2 py-1 bg-zinc-900 text-zinc-300 rounded-md border border-zinc-800 text-[10px] font-medium">
                  {pm}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 pt-2">
              Soporte humano disponible los 7 días de la semana.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Hypertecgian Store. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-zinc-300 transition-colors">Términos de Garantía</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors">Preguntas Frecuentes</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors">Aviso de Privacidad</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
