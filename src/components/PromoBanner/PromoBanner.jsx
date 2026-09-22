import React from "react";
import { Link } from "react-router-dom";
import "./PromoBanner.css";

const PromoBanner = () => {
  return (
    <section className="promo">
      <div className="container-nexora">
        <div className="promo__inner glass">
          <div className="promo__glow" aria-hidden="true" />
          <div className="promo__content">
            <span className="badge-neon">Limited Time</span>
            <h3 className="promo__title">
              Save up to <span className="grad-text">40% OFF</span>
              <br />on Selected Gaming Gear
            </h3>
            <p className="promo__text">
              Level up without breaking the bank. Use code{" "}
              <strong className="text-neon">NEXORA10</strong> at checkout for an extra 10% off.
            </p>
            <Link to="/shop" className="btn-nexora">Shop the Sale -&gt;</Link>
          </div>
          <div className="promo__art" aria-hidden="true">{"\uD83C\uDFAE"}</div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
