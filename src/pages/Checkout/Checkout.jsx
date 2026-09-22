import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { getShippingCost, generateOrderId, estimatedDelivery, formatPrice } from "../../utils/helpers";
import { validateCheckout } from "../../utils/validation";
import "./Checkout.css";

const INITIAL_FORM = {
  fullName: "", email: "", phone: "", address: "", city: "", state: "",
  postalCode: "", country: "United States", cardName: "", cardNumber: "",
  expiry: "", cvv: "", upiId: "",
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart, showToast } = useShop();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  const shipping = getShippingCost(cartSubtotal);
  const total = cartSubtotal + shipping;
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const handlePaymentChange = (method) => { setPaymentMethod(method); setErrors({}); };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errs = validateCheckout(form, paymentMethod);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast("Please fix the highlighted fields", "error");
      const firstKey = Object.keys(errs)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const newOrder = { id: generateOrderId(), name: form.fullName, total, itemCount, delivery: estimatedDelivery(5) };
      setOrder(newOrder);
      clearCart();
      setPlacing(false);
      showToast("Order placed successfully!", "success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  if (order) {
    return (
      <div className="page checkout">
        <div className="container-nexora">
          <div className="checkout__success glass fade-up">
            <span className="checkout__successIcon" aria-hidden="true">{"\u2713"}</span>
            <h1>Order <span className="grad-text">Confirmed</span></h1>
            <p className="checkout__successMsg">Thank you, <strong>{order.name}</strong>! Your order has been placed successfully.</p>
            <div className="checkout__orderBox">
              <div className="checkout__orderRow"><span>Order ID</span><strong>{order.id}</strong></div>
              <div className="checkout__orderRow"><span>Items</span><strong>{order.itemCount}</strong></div>
              <div className="checkout__orderRow"><span>Total Paid</span><strong className="text-neon">{formatPrice(order.total)}</strong></div>
              <div className="checkout__orderRow"><span>Estimated Delivery</span><strong>{order.delivery}</strong></div>
            </div>
            <div className="checkout__successActions">
              <Link to="/shop" className="btn-nexora">Continue Shopping -&gt;</Link>
              <Link to="/" className="btn-ghost">Back to Home</Link>
            </div>
            <p className="checkout__successNote">A confirmation email has been sent (simulated).</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page checkout">
        <div className="container-nexora">
          <div className="checkout__empty glass">
            <span aria-hidden="true">{"\uD83D\uDED2"}</span>
            <h2>Your cart is empty</h2>
            <p>Add some gear before checking out.</p>
            <Link to="/shop" className="btn-nexora">Go to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout">
      <div className="container-nexora">
        <div className="checkout__header">
          <h1 className="section-title">Secure <span className="grad-text">Checkout</span></h1>
          <p className="section-subtitle">Complete your details to place your order.</p>
        </div>
        <form className="checkout__layout" onSubmit={handlePlaceOrder} noValidate>
          <div className="checkout__form">
            <section className="checkout__card glass">
              <h3 className="checkout__cardTitle"><span className="checkout__step">1</span> Shipping Information</h3>
              <div className="checkout__grid">
                <div className="checkout__field checkout__field--full">
                  <label className="form-label-nexora" htmlFor="fullName">Full Name *</label>
                  <input id="fullName" name="fullName" type="text" className={"form-control-nexora" + (errors.fullName ? " error" : "")} value={form.fullName} onChange={handleChange} placeholder="John Doe" />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>
                <div className="checkout__field">
                  <label className="form-label-nexora" htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" className={"form-control-nexora" + (errors.email ? " error" : "")} value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="checkout__field">
                  <label className="form-label-nexora" htmlFor="phone">Phone *</label>
                  <input id="phone" name="phone" type="tel" className={"form-control-nexora" + (errors.phone ? " error" : "")} value={form.phone} onChange={handleChange} placeholder="+1 555 123 4567" />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="checkout__field checkout__field--full">
                  <label className="form-label-nexora" htmlFor="address">Address *</label>
                  <input id="address" name="address" type="text" className={"form-control-nexora" + (errors.address ? " error" : "")} value={form.address} onChange={handleChange} placeholder="123 Gamer Street, Apt 4B" />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>
                <div className="checkout__field">
                  <label className="form-label-nexora" htmlFor="city">City *</label>
                  <input id="city" name="city" type="text" className={"form-control-nexora" + (errors.city ? " error" : "")} value={form.city} onChange={handleChange} placeholder="Los Angeles" />
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
                <div className="checkout__field">
                  <label className="form-label-nexora" htmlFor="state">State / Province *</label>
                  <input id="state" name="state" type="text" className={"form-control-nexora" + (errors.state ? " error" : "")} value={form.state} onChange={handleChange} placeholder="California" />
                  {errors.state && <span className="form-error">{errors.state}</span>}
                </div>
                <div className="checkout__field">
                  <label className="form-label-nexora" htmlFor="postalCode">Postal Code *</label>
                  <input id="postalCode" name="postalCode" type="text" className={"form-control-nexora" + (errors.postalCode ? " error" : "")} value={form.postalCode} onChange={handleChange} placeholder="90001" />
                  {errors.postalCode && <span className="form-error">{errors.postalCode}</span>}
                </div>
                <div className="checkout__field">
                  <label className="form-label-nexora" htmlFor="country">Country *</label>
                  <input id="country" name="country" type="text" className={"form-control-nexora" + (errors.country ? " error" : "")} value={form.country} onChange={handleChange} placeholder="United States" />
                  {errors.country && <span className="form-error">{errors.country}</span>}
                </div>
              </div>
            </section>

            <section className="checkout__card glass">
              <h3 className="checkout__cardTitle"><span className="checkout__step">2</span> Payment Method</h3>
              <div className="checkout__payMethods">
                <label className={"checkout__pay" + (paymentMethod === "card" ? " is-active" : "")}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => handlePaymentChange("card")} />
                  <span className="checkout__payIcon">{"\uD83D\uDCB3"}</span>
                  <span>Credit / Debit Card</span>
                </label>
                <label className={"checkout__pay" + (paymentMethod === "upi" ? " is-active" : "")}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => handlePaymentChange("upi")} />
                  <span className="checkout__payIcon">{"\uD83D\uDCF1"}</span>
                  <span>UPI</span>
                </label>
                <label className={"checkout__pay" + (paymentMethod === "cod" ? " is-active" : "")}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => handlePaymentChange("cod")} />
                  <span className="checkout__payIcon">{"\uD83D\uDCB5"}</span>
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="checkout__grid checkout__payFields">
                  <div className="checkout__field checkout__field--full">
                    <label className="form-label-nexora" htmlFor="cardName">Name on Card *</label>
                    <input id="cardName" name="cardName" type="text" className={"form-control-nexora" + (errors.cardName ? " error" : "")} value={form.cardName} onChange={handleChange} placeholder="John Doe" />
                    {errors.cardName && <span className="form-error">{errors.cardName}</span>}
                  </div>
                  <div className="checkout__field checkout__field--full">
                    <label className="form-label-nexora" htmlFor="cardNumber">Card Number *</label>
                    <input id="cardNumber" name="cardNumber" type="text" inputMode="numeric" className={"form-control-nexora" + (errors.cardNumber ? " error" : "")} value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" maxLength={23} />
                    {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                  </div>
                  <div className="checkout__field">
                    <label className="form-label-nexora" htmlFor="expiry">Expiry (MM/YY) *</label>
                    <input id="expiry" name="expiry" type="text" className={"form-control-nexora" + (errors.expiry ? " error" : "")} value={form.expiry} onChange={handleChange} placeholder="12/28" maxLength={5} />
                    {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                  </div>
                  <div className="checkout__field">
                    <label className="form-label-nexora" htmlFor="cvv">CVV *</label>
                    <input id="cvv" name="cvv" type="password" inputMode="numeric" className={"form-control-nexora" + (errors.cvv ? " error" : "")} value={form.cvv} onChange={handleChange} placeholder="123" maxLength={4} />
                    {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="checkout__grid checkout__payFields">
                  <div className="checkout__field checkout__field--full">
                    <label className="form-label-nexora" htmlFor="upiId">UPI ID *</label>
                    <input id="upiId" name="upiId" type="text" className={"form-control-nexora" + (errors.upiId ? " error" : "")} value={form.upiId} onChange={handleChange} placeholder="yourname@bank" />
                    {errors.upiId && <span className="form-error">{errors.upiId}</span>}
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <p className="checkout__codNote">Pay with cash when your order is delivered. An additional handling fee may apply.</p>
              )}
            </section>
          </div>

          <OrderSummary subtotal={cartSubtotal} discount={0} shipping={shipping} total={total} itemCount={itemCount}>
            <button type="submit" className="btn-nexora" disabled={placing}>
              {placing ? "Placing Order..." : `Place Order - ${formatPrice(total)}`}
            </button>
            <p className="checkout__secure">{"\uD83D\uDD12"} Secure checkout. We never store payment details.</p>
          </OrderSummary>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
