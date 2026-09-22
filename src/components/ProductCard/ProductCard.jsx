import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { calcDiscount, formatPrice } from "../../utils/helpers";
import RatingStars from "../RatingStars/RatingStars";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const discount = calcDiscount(product.originalPrice, product.price);
  const wishlisted = isInWishlist(product.id);

  const handleAdd = (e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); };
  const handleWish = (e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };
  const handleView = (e) => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${product.id}`); };

  return (
    <div className="pcard">
      <Link to={`/product/${product.id}`} className="pcard__imgWrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount > 0 && <span className="pcard__discount">-{discount}%</span>}
        <button type="button" className={`pcard__wish ${wishlisted ? "is-active" : ""}`} onClick={handleWish} aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"} title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
          {wishlisted ? "\u2665" : "\u2661"}
        </button>
      </Link>
      <div className="pcard__body">
        <span className="pcard__cat">{product.category}</span>
        <Link to={`/product/${product.id}`} className="pcard__name">{product.name}</Link>
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <div className="pcard__priceRow">
          <span className="pcard__price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="pcard__original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="pcard__actions">
          <button type="button" className="btn-nexora pcard__add" onClick={handleAdd}>Add to Cart</button>
          <button type="button" className="btn-ghost pcard__view" onClick={handleView}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
