import React from "react";
import { Link } from "react-router-dom";
import products, { categories } from "../../data/products";
import Hero from "../../components/Hero/Hero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import "./Home.css";

const Home = () => {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="page home">
      <Hero />
      <section className="section-pad">
        <div className="container-nexora">
          <div className="home__sectionHead">
            <div>
              <h2 className="section-title">Shop by <span className="grad-text">Category</span></h2>
              <p className="section-subtitle">Find the perfect gear for every setup.</p>
            </div>
          </div>
          <div className="home__cats">
            {categories.map((c) => <CategoryCard key={c} category={c} />)}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-nexora">
          <div className="home__sectionHead">
            <div>
              <h2 className="section-title">Featured <span className="grad-text">Products</span></h2>
              <p className="section-subtitle">Handpicked gear loved by pros.</p>
            </div>
            <Link to="/shop" className="btn-ghost home__viewAll">View All -&gt;</Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>
      <PromoBanner />
      <section className="section-pad">
        <div className="container-nexora">
          <div className="home__sectionHead">
            <div>
              <h2 className="section-title">Trending <span className="grad-text">Now</span></h2>
              <p className="section-subtitle">The most talked-about gear this week.</p>
            </div>
            <Link to="/shop?sort=rating" className="btn-ghost home__viewAll">See More -&gt;</Link>
          </div>
          <ProductGrid products={trending} />
        </div>
      </section>
    </div>
  );
};

export default Home;
