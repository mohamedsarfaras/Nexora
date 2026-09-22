import React, { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("nexora_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("nexora_wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("nexora_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nexora_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`${product.name} added to cart`, "success");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast("Item removed from cart", "info");
  };

  const updateQty = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`, "info");
        return prev.filter((i) => i.id !== product.id);
      }
      showToast(`${product.name} added to wishlist`, "success");
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartOriginalTotal = cart.reduce((s, i) => s + (i.originalPrice || i.price) * i.quantity, 0);
  const cartSavings = cartOriginalTotal - cartSubtotal;

  const value = {
    cart, wishlist, toast,
    cartCount, wishlistCount, cartSubtotal, cartSavings,
    addToCart, removeFromCart, updateQty, clearCart,
    toggleWishlist, removeFromWishlist, isInWishlist,
    showToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
