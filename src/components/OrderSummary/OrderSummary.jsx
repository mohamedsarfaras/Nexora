import React from "react";
import { formatPrice } from "../../utils/helpers";
import "./OrderSummary.css";

const OrderSummary = ({ subtotal = 0, discount = 0, shipping = 0, total = 0, itemCount = 0, couponLabel = null, children }) => {
  return (
    <div className="osum glass">
      <h4 className="osum__title">Order Summary</h4>
      <p className="osum__items">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
      <div className="osum__rows">
        <div className="osum__row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {discount > 0 && (
          <div className="osum__row osum__row--discount">
            <span>Discount {couponLabel ? <em>({couponLabel})</em> : null}</span>
            <span>{"\u2212"}{formatPrice(discount)}</span>
          </div>
        )}
        <div className="osum__row"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
      </div>
      <div className="osum__divider" />
      <div className="osum__total">
        <span>Total</span>
        <span className="grad-text">{formatPrice(total)}</span>
      </div>
      {children && <div className="osum__actions">{children}</div>}
    </div>
  );
};

export default OrderSummary;
