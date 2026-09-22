import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/helpers";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useShop();
  return (
    <div className="citem glass">
      <Link to={`/product/${item.id}`} className="citem__imgWrap">
        <img src={item.image} alt={item.name} />
      </Link>
      <div className="citem__info">
        <span className="citem__cat">{item.category}</span>
        <Link to={`/product/${item.id}`} className="citem__name">{item.name}</Link>
        <span className="citem__price">{formatPrice(item.price)}</span>
      </div>
      <div className="citem__qty">
        <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity">{"\u2212"}</button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
      </div>
      <div className="citem__total">{formatPrice(item.price * item.quantity)}</div>
      <button type="button" className="citem__remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`}>{"\u00D7"}</button>
    </div>
  );
};

export default CartItem;
