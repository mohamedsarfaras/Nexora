import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import CartItem from "../../components/CartItem/CartItem";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { COUPONS, getShippingCost, formatPrice, FREE_SHIPPING_THRESHOLD } from "../../utils/helpers";
import "./Cart.css";

const Cart = () => {
  const { cart, clearCart, cartSubtotal, showToast } = useShop();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  let discount = 0;
  let freeShipping = false;
  let couponLabel = null;

  if (appliedCoupon) {
    const c = COUPONS[appliedCoupon];
    if (c) {
      if (c.type === "percent") discount = (cartSubtotal * c.value) / 100;
      else if (c.type === "shipping") freeShipping = true;
      couponLabel = appliedCoupon;
    }
  }

  const shipping = getShippingCost(cartSubtotal, freeShipping);
  const total = Math.max(0, cartSubtotal - discount + shipping);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (!COUPONS[code]) { showToast("Invalid coupon code", "error"); return; }
    setAppliedCoupon(code);
    showToast(`Coupon ${code} applied - ${COUPONS[code].label}`, "success");
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  if (cart.length === 0) {
    return (
      <div className="page cart">
        <div className="container-nexora">
          <div className="cart__empty glass">
            <span aria-hidden="true">{"\uD83D\uDED2"}</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn-nexora">Start Shopping -&gt;</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart">
      <div className="container-nexora">
        <div className="cart__header">
          <div>
            <h1 className="section-title">Your <span className="grad-text">Cart</span></h1>
            <p className="section-subtitle">{itemCount} item{itemCount !== 1 ? "s" : ""} ready for checkout.</p>
          </div>
          <button type="button" className="btn-danger-soft" onClick={clearCart}>Clear Cart</button>
        </div>
        <div className="cart__layout">
          <div className="cart__items">
            {cart.map((item) => <CartItem key={item.id} item={item} />)}
            <div className="cart__coupon glass">
              <h4>Have a coupon?</h4>
              {appliedCoupon ? (
                <div className="cart__couponApplied">
                  <span className="badge-neon">{appliedCoupon}</span>
                  <span className="cart__couponLabel">{COUPONS[appliedCoupon].label}</span>
                  <button type="button" className="cart__couponRemove" onClick={handleRemoveCoupon}>Remove</button>
                </div>
              ) : (
                <div className="cart__couponRow">
                  <input type="text" className="form-control-nexora" placeholder="Enter code (e.g. NEXORA10)" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()} />
                  <button type="button" className="btn-nexora cart__couponBtn" onClick={handleApplyCoupon}>Apply</button>
                </div>
              )}
              {!appliedCoupon && (
                <p className="cart__couponHint">Try <strong>NEXORA10</strong>, <strong>GAMER20</strong> or <strong>FREESHIP</strong></p>
              )}
            </div>
          </div>
          <OrderSummary subtotal={cartSubtotal} discount={discount} shipping={shipping} total={total} itemCount={itemCount} couponLabel={couponLabel}>
            <button type="button" className="btn-nexora" onClick={() => navigate("/checkout")}>Proceed to Checkout -&gt;</button>
            <Link to="/shop" className="btn-ghost">Continue Shopping</Link>
            {shipping > 0 && (
              <p className="cart__shipHint">
                Spend <strong className="text-neon">{formatPrice(FREE_SHIPPING_THRESHOLD - cartSubtotal)}</strong> more for free shipping.
              </p>
            )}
          </OrderSummary>
        </div>
      </div>
    </div>
  );
};

export default Cart;
