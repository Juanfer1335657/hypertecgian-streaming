'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  StreamingProduct, 
  CartItem, 
  CurrencyCode, 
  PlanDuration, 
  ProductCategory,
  PlacedOrder
} from '@/types';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { getProductPrice } from '@/data/currencies';
import Navbar from '@/components/Navbar';

import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import FloatingCart from '@/components/FloatingCart';

// Lazy-load interactive modals to keep the initial bundle light
const ProductModal = dynamic(() => import('@/components/ProductModal'), { ssr: false });
const SmartRecommenderModal = dynamic(() => import('@/components/SmartRecommenderModal'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });
const CheckoutModal = dynamic(() => import('@/components/CheckoutModal'), { ssr: false });
const OrderSuccessModal = dynamic(() => import('@/components/OrderSuccessModal'), { ssr: false });
import { 
  Sparkles, 
  Tv, 
  Music, 
  RadioTower, 
  Bot, 
  Flame, 
  Search,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const [currency, setCurrency] = useState<CurrencyCode>('COP');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<StreamingProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCurrencyChange = (newCurr: CurrencyCode) => {
    setCurrency(newCurr);
  };

  // Add item to cart
  const handleAddToCart = (
    product: StreamingProduct,
    durationMonths: PlanDuration = 1,
    accountType: 'profile' | 'full' = 'profile'
  ) => {
    const { totalPriceUSD, months } = getProductPrice(product, accountType, durationMonths);

    const cartItemId = `${product.id}-${months}-${accountType}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIdx > -1) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          product,
          durationMonths: months,
          accountType,
          unitPriceUSD: totalPriceUSD,
          quantity: 1
        }
      ];
    });

    showToast(`"${product.name}" (${months}M) añadido al carrito`);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleBuyNow = (
    product: StreamingProduct,
    durationMonths: PlanDuration = 1,
    accountType: 'profile' | 'full' = 'profile'
  ) => {
    const { totalPriceUSD, months } = getProductPrice(product, accountType, durationMonths);

    const singleItem: CartItem = {
      cartItemId: `${product.id}-${months}-${accountType}`,
      productId: product.id,
      product,
      durationMonths: months,
      accountType,
      unitPriceUSD: totalPriceUSD,
      quantity: 1
    };

    setCheckoutItems([singleItem]);
    setIsCheckoutOpen(true);
  };

  const handleStartCartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: PlacedOrder) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(order);
    // If the completed order items were from the cart, clear the cart
    if (checkoutItems.length > 0 && cartItems.some(ci => ci.cartItemId === checkoutItems[0].cartItemId)) {
      setCartItems([]);
    }
    showToast(`¡Pedido #${order.orderId} enviado a WhatsApp!`);
  };

  // Filter products by category and search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      product.name.toLowerCase().includes(q) ||
      product.tagline.toLowerCase().includes(q) ||
      product.features.some((f) => f.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const categoryIcons: Record<string, any> = {
    all: Sparkles,
    video: Tv,
    music: Music,
    iptv: RadioTower,
    ai: Bot,
    combos: Flame
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-white selection:text-black font-sans antialiased">
      
      {/* Main Navbar */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={handleCurrencyChange}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRecommender={() => setIsRecommenderOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs sm:text-sm font-bold shadow-2xl flex items-center space-x-2 backdrop-blur-md animate-toast-in">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1">
        
        {/* Hero Banner */}
        <HeroBanner
          onExploreClick={() => {
            const el = document.getElementById('catalogo');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenRecommender={() => setIsRecommenderOpen(true)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('catalogo');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Catalog Section with Category Filter Tabs */}
        <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Catálogo Completo y Actualizado</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Elige Tu Suscripción
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Todas las cuentas cuentan con garantía total de reposición y activación rápida.
              </p>
            </div>

            {/* Current Results Count */}
            <div className="text-xs text-zinc-400 font-medium">
              Mostrando <strong className="text-white">{filteredProducts.length}</strong> de {PRODUCTS.length} servicios disponibles
            </div>
          </div>

          {/* Category Tabs Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-black shadow-md border border-white'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-zinc-200 text-black' : 'bg-zinc-900 text-zinc-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Empty Search State */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center text-zinc-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No encontramos resultados para &ldquo;{searchQuery}&rdquo;</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Intenta con otro término como Netflix, Disney+, Spotify, o selecciona &ldquo;Todos los Servicios&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onAddToCart={handleAddToCart}
                  onOpenDetails={(p) => setSelectedProductForModal(p)}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cart Button */}
      <FloatingCart itemCount={totalCartCount} onClick={() => setIsCartOpen(true)} />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProductForModal}
        currency={currency}
        isOpen={Boolean(selectedProductForModal)}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <SmartRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleStartCartCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        currency={currency}
        onOrderCompleted={handleOrderCompleted}
      />

      <OrderSuccessModal
        order={completedOrder}
        isOpen={Boolean(completedOrder)}
        onClose={() => setCompletedOrder(null)}
      />

    </div>
  );
}
