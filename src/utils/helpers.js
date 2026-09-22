/* NEXORA Helpers */
export const formatPrice = (n) => `$${Number(n || 0).toFixed(2)}`;

export const calcDiscount = (original, price) => {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
};

export const generateOrderId = () =>
  "NEX-" + Date.now().toString(36).toUpperCase().slice(-6) + "-" + Math.floor(Math.random() * 9000 + 1000);

export const estimatedDelivery = (days = 5) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
};

export const COUPONS = {
  NEXORA10: { type: "percent", value: 10, label: "10% off your order" },
  GAMER20: { type: "percent", value: 20, label: "20% off your order" },
  FREESHIP: { type: "shipping", value: 0, label: "Free shipping" },
};

export const SHIPPING_FLAT = 9.99;
export const FREE_SHIPPING_THRESHOLD = 199;

export const getShippingCost = (subtotal, freeShipping = false) => {
  if (freeShipping) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FLAT;
};

export const truncate = (str, n = 80) =>
  str && str.length > n ? str.slice(0, n) + "..." : str;
