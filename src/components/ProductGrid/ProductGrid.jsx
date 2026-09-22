import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="pgrid__empty glass">
        <span className="pgrid__emptyIcon" aria-hidden="true">{"\uD83D\uDD0D"}</span>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }
  return (
    <div className="pgrid">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};

export default ProductGrid;
