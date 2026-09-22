import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/helpers";
import "./WishlistOffcanvas.css";

const WishlistOffcanvas = ({ show, onClose }) => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  const navigate = useNavigate();

  const handleAddToCart = (product) => addToCart(product, 1);
  const handleView = (id) => { onClose(); navigate(`/product/${id}`); };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="wl-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <span className="grad-text">Wishlist</span> <span className="wl-count">({wishlist.length})</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {wishlist.length === 0 ? (
          <div className="wl-empty">
            <span aria-hidden="true">{"\u2661"}</span>
            <h5>Your wishlist is empty</h5>
            <p>Save your favorite gear to view it later.</p>
            <button type="button" className="btn-nexora" onClick={() => { onClose(); navigate("/shop"); }}>Browse Shop</button>
          </div>
        ) : (
          <div className="wl-list">
            {wishlist.map((item) => (
              <div key={item.id} className="wl-item">
                <img src={item.image} alt={item.name} onClick={() => handleView(item.id)} />
                <div className="wl-item__info">
                  <h6 onClick={() => handleView(item.id)}>{item.name}</h6>
                  <span className="wl-item__price">{formatPrice(item.price)}</span>
                  <div className="wl-item__actions">
                    <button type="button" className="btn-outline-neon wl-item__add" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    <button type="button" className="wl-item__remove" onClick={() => removeFromWishlist(item.id)} aria-label="Remove from wishlist">{"\u00D7"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default WishlistOffcanvas;
