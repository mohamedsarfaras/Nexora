import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../../data/products";
import { useShop } from "../../context/ShopContext";
import { calcDiscount, formatPrice } from "../../utils/helpers";
import RatingStars from "../../components/RatingStars/RatingStars";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const product = products.find((p) => String(p.id) === String(id));
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="page pd">
        <div className="container-nexora pd__notFound glass">
          <span aria-hidden="true">{"\uD83C\uDFAE"}</span>
          <h2>Product not found</h2>
          <p>We couldn't find a product with ID <strong>"{id}"</strong>.</p>
          <div className="pd__notFoundActions">
            <Link to="/shop" className="btn-nexora">Back to Shop</Link>
            <Link to="/" className="btn-ghost">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = calcDiscount(product.originalPrice, product.price);
  const wishlisted = isInWishlist(product.id);
  const gallery = [product.image, product.image + "&sat=-30", product.image + "&blur=1"];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => addToCart(product, qty);
  const handleWish = () => toggleWishlist(product);
  const handleBuyNow = () => { addToCart(product, qty); navigate("/cart"); };

  return (
    <div className="page pd">
      <div className="container-nexora">
        <nav className="pd__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/shop">Shop</Link><span>/</span>
          <Link to={`/shop?category=${product.category}`}>{product.category}</Link><span>/</span>
          <span className="pd__crumbCurrent">{product.name}</span>
        </nav>
        <div className="pd__layout">
          <div className="pd__gallery">
            <div className="pd__mainImgWrap">
              <img src={gallery[activeImg]} alt={product.name} className="pd__mainImg" />
              {discount > 0 && <span className="pd__discount">-{discount}%</span>}
            </div>
            <div className="pd__thumbs">
              {gallery.map((src, i) => (
                <button key={i} type="button" className={"pd__thumb" + (i === activeImg ? " is-active" : "")} onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`}>
                  <img src={src} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="pd__info">
            <span className="pd__cat">{product.category}</span>
            <h1 className="pd__name">{product.name}</h1>
            <RatingStars rating={product.rating} reviews={product.reviews} size="md" />
            <div className="pd__priceRow">
              <span className="pd__price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pd__original">{formatPrice(product.originalPrice)}</span>
                  <span className="badge-danger">Save {formatPrice(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>
            <p className="pd__desc">{product.description}</p>
            <div className="pd__stock">
              <span className="pd__stockDot" />In Stock - Ships within 24 hours
            </div>
            <div className="pd__actions">
              <div className="pd__qty">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">{"\u2212"}</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button type="button" className="btn-nexora pd__addBtn" onClick={handleAddToCart}>Add to Cart</button>
              <button type="button" className="btn-ghost pd__wishBtn" onClick={handleWish}>
                {wishlisted ? "\u2665 Wishlisted" : "\u2661 Wishlist"}
              </button>
            </div>
            <button type="button" className="btn-outline-neon pd__buyNow" onClick={handleBuyNow}>Buy Now -&gt;</button>
            <div className="pd__specs glass">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([k, v]) => (
                  <li key={k}><span>{k}</span><span>{v}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="pd__related">
            <h2 className="section-title">You May Also <span className="grad-text">Like</span></h2>
            <div className="pd__relatedGrid"><ProductGrid products={related} /></div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
