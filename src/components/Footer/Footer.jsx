/* =========================================================
   Footer — minimal: motto + copyright
   ========================================================= */
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-nexora footer__inner">
        <Link to="/" className="footer__logo">
          NEX<span className="grad-text">ORA</span>
        </Link>
        <p className="footer__tagline">Level Up Your Game.</p>
      </div>

      <div className="footer__bottom">
        <div className="container-nexora footer__bottomInner">
          <span>© 2026 NEXORA. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;