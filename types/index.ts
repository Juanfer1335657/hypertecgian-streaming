export type ProductCategory = 'all' | 'video' | 'music' | 'ai' | 'iptv' | 'combos';

export type PlanDuration = 1 | 3 | 6 | 12;

export interface PlanOption {
  months: PlanDuration;
  label: string;
  discountPercent: number;
  badge?: string;
}

export interface StreamingProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'video' | 'music' | 'ai' | 'iptv' | 'combos';
  badge?: string;
  badgeColor?: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  bgGlow: string;
  basePriceUSD: number;
  /**
   * Duraciones y precios disponibles para el producto. Cada opción indica los
   * meses y el PRECIO TOTAL de ese plan (p. ej. Prime Video: 1 mes $15.000 y
   * 6 meses $30.000). Si se omite, el producto se vende mensual con basePriceUSD.
   */
  priceOptions?: PriceOption[];
  screens: string;
  quality: string;
  features: string[];
  devices: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  popular?: boolean;
  isCombo?: boolean;
  comboItems?: string[];
  accountOptions: {
    hasProfileOption: boolean;
    hasFullAccountOption: boolean;
    profileDiscountFactor: number; // e.g. 0.6 if profile is cheaper than full account
  };
}

export interface PriceOption {
  months: PlanDuration;
  /** Precio TOTAL del plan para esa duración. */
  priceUSD: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: StreamingProduct;
  durationMonths: PlanDuration;
  accountType: 'profile' | 'full';
  unitPriceUSD: number;
  quantity: number;
}

export type CurrencyCode = 'USD' | 'COP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromUSD: number;
  flag: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface OrderCredential {
  service: string;
  type: string;
  user: string;
  pass: string;
  pin?: string;
  screens: string;
  expiryDays: number;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  customerName: string;
  customerContact: string;
  paymentMethod: string;
  items: CartItem[];
  currency: CurrencyCode;
  total: number;
  discountApplied: number;
  promoCode?: string;
  credentials: OrderCredential[];
  status: 'completada' | 'procesando';
}
