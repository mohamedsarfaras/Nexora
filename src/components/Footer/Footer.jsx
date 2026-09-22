import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-nexora footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">NEX<span className="grad-text">ORA</span></Link>
          <p className="footer__tagline">Level Up Your Game.</p>
          <p className="footer__desc">Premium gaming gear for players who demand the best. Built for performance, designed for victory.</p>
        </div>
        <div className="footer__col">
          <h6>Shop</h6>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?category=Keyboards">Keyboards</Link>
          <Link to="/shop?category=Mice">Mice</Link>
          <Link to="/shop?category=Headsets">Headsets</Link>
        </div>
        <div className="footer__col">
          <h6>Company</h6>
          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#press">Press</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__col">
          <h6>Support</h6>
          <a href="#help">Help Center</a>
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
          <a href="#warranty">Warranty</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container-nexora footer__bottomInner">
          <span>{"\u00A9"} {new Date().getFullYear()} NEXORA. All rights reserved.</span>
          <span className="footer__legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
