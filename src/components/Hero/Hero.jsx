import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />
      <div className="container-nexora hero__inner">
        <div className="hero__content fade-up">
          <span className="badge-neon hero__tag">New Season Drop</span>
          <h1 className="hero__title">
            LEVEL UP <br />
            <span className="grad-text">YOUR GAME</span>
          </h1>
          <p className="hero__subtitle">
            Premium gaming gear engineered for players who refuse to settle.
            Keyboards, mice, headsets and more - built for the win.
          </p>
          <div className="hero__cta">
            <Link to="/shop" className="btn-nexora">Shop Now -&gt;</Link>
            <Link to="/shop?category=Keyboards" className="btn-ghost">Explore Keyboards</Link>
          </div>
          <div className="hero__stats">
            <div><strong className="grad-text">250+</strong><span>Pro Products</span></div>
            <div><strong className="grad-text">99%</strong><span>Happy Gamers</span></div>
            <div><strong className="grad-text">24/7</strong><span>Support</span></div>
          </div>
        </div>
        <div className="hero__art fade-up">
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80" alt="Futuristic gaming setup with neon lighting" />
          <div className="hero__artGlow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
