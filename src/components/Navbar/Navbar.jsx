import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import WishlistOffcanvas from "../WishlistOffcanvas/WishlistOffcanvas";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount, wishlistCount } = useShop();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/shop?q=${encodeURIComponent(q)}`);
    else navigate("/shop");
    setMobileOpen(false);
  };
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="navbar-nexora">
        <div className="container-nexora navbar-nexora__inner">
          <Link to="/" className="navbar-nexora__brand" onClick={closeMobile}>
            NEX<span className="grad-text">ORA</span>
          </Link>
          <nav className="navbar-nexora__links">
            <NavLink to="/" end className={({ isActive }) => "navbar-nexora__link" + (isActive ? " is-active" : "")}>Home</NavLink>
            <NavLink to="/shop" className={({ isActive }) => "navbar-nexora__link" + (isActive ? " is-active" : "")}>Shop</NavLink>
            <button type="button" className="navbar-nexora__link navbar-nexora__link--btn" onClick={() => setWishlistOpen(true)}>
              Wishlist
              {wishlistCount > 0 && (
                <span className="navbar-nexora__badge navbar-nexora__badge--purple">{wishlistCount}</span>
              )}
            </button>
          </nav>
          <form className="navbar-nexora__search" onSubmit={handleSearch}>
            <span className="navbar-nexora__searchIcon" aria-hidden="true">{"\u2315"}</span>
            <input type="text" placeholder="Search gear..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search products" />
          </form>
          <div className="navbar-nexora__actions">
            <Link to="/cart" className="navbar-nexora__cart" aria-label="Cart">
              <span aria-hidden="true">{"\uD83D\uDED2"}</span>
              {cartCount > 0 && <span className="navbar-nexora__badge">{cartCount}</span>}
            </Link>
            <button type="button" className="navbar-nexora__burger" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="navbar-nexora__mobile">
            <Link to="/" onClick={closeMobile}>Home</Link>
            <Link to="/shop" onClick={closeMobile}>Shop</Link>
            <button type="button" onClick={() => { setWishlistOpen(true); closeMobile(); }}>
              Wishlist ({wishlistCount})
            </button>
            <Link to="/cart" onClick={closeMobile}>Cart ({cartCount})</Link>
          </div>
        )}
      </header>
      <WishlistOffcanvas show={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default Navbar;
