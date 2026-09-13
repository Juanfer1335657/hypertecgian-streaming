import { CurrencyCode, CurrencyConfig, StreamingProduct, PlanDuration } from '@/types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar estadounidense',
    rateFromUSD: 1.0,
    flag: '🇺🇸'
  },
  COP: {
    code: 'COP',
    symbol: '$',
    name: 'Peso colombiano',
    rateFromUSD: 3100,
    flag: '🇨🇴'
  }
};

export function formatPrice(amountUSD: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * currency.rateFromUSD;

  if (currencyCode === 'COP') {
    return `${currency.symbol} ${Math.round(converted).toLocaleString('es-CO')} COP`;
  }
  return `${currency.symbol} ${converted.toFixed(2)} USD`;
}

export function calculatePlanPrice(
  basePriceUSD: number,
  months: number,
  discountPercent: number,
  accountType: 'profile' | 'full',
  profileDiscountFactor: number
): { totalPriceUSD: number; perMonthUSD: number; savingsUSD: number } {
  // No rounding here: prices keep full precision so they convert back to exact
  // amounts (e.g. exact COP figures) when formatted for display.
  const monthlyBase = accountType === 'full' && profileDiscountFactor < 1
    ? basePriceUSD / profileDiscountFactor
    : basePriceUSD;

  const normalTotal = monthlyBase * months;
  const discountMultiplier = (100 - discountPercent) / 100;
  const totalPriceUSD = normalTotal * discountMultiplier;
  const perMonthUSD = totalPriceUSD / months;
  const savingsUSD = normalTotal - totalPriceUSD;

  return { totalPriceUSD, perMonthUSD, savingsUSD };
}

export function getProductPrice(
  product: StreamingProduct,
  accountType: 'profile' | 'full' = 'profile',
  preferredMonths?: PlanDuration
): { totalPriceUSD: number; perMonthUSD: number; savingsUSD: number; months: PlanDuration } {
  if (product.priceOptions && product.priceOptions.length > 0) {
    // Duración preferida si existe; si no (p. ej. pedido de 1 mes para un plan
    // fijo), se toma la primera opción disponible.
    const option =
      product.priceOptions.find((o) => o.months === preferredMonths) ||
      product.priceOptions[0];
    return {
      totalPriceUSD: option.priceUSD,
      perMonthUSD: option.priceUSD / option.months,
      savingsUSD: 0,
      months: option.months
    };
  }

  const result = calculatePlanPrice(
    product.basePriceUSD,
    1,
    0,
    accountType,
    product.accountOptions.profileDiscountFactor
  );
  return { ...result, months: 1 };
}
