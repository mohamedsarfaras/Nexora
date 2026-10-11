import React from "react";
import { categories } from "../../data/products";
import "./FilterPanel.css";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A to Z" },
];

const FilterPanel = ({ activeCategory, onCategoryChange, priceRange, onPriceChange, maxPrice, sort, onSortChange, onClear, resultCount }) => {
  return (
    <aside className="fpanel glass">
      <div className="fpanel__head">
        <h5>Filters</h5>
        <span className="fpanel__count">{resultCount} results</span>
      </div>
      <div className="fpanel__group">
        <h6>Category</h6>
        <div className="fpanel__cats">
          <button type="button" className={"fpanel__cat" + (activeCategory === "All" ? " is-active" : "")} onClick={() => onCategoryChange("All")}>All</button>
          {categories.map((c) => (
            <button key={c} type="button" className={"fpanel__cat" + (activeCategory === c ? " is-active" : "")} onClick={() => onCategoryChange(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="fpanel__group">
        <h6>Max Price: <span className="text-neon">₹{priceRange}</span></h6>
        <input type="range" min="0" max={maxPrice} step="10" value={priceRange} onChange={(e) => onPriceChange(Number(e.target.value))} className="fpanel__range" aria-label="Maximum price" />
      </div>
      <div className="fpanel__group">
        <h6>Sort By</h6>
        <select className="form-select-nexora" value={sort} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort products">
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <button type="button" className="btn-ghost fpanel__clear" onClick={onClear}>Clear Filters</button>
    </aside>
  );
};

export default FilterPanel;
