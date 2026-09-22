import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products, { categories } from "../../data/products";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./Shop.css";

const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10;

const sortProducts = (list, sort) => {
  switch (sort) {
    case "price-asc": return [...list].sort((a, b) => a.price - b.price);
    case "price-desc": return [...list].sort((a, b) => b.price - a.price);
    case "rating": return [...list].sort((a, b) => b.rating - a.rating);
    case "name": return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default: return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialSort = searchParams.get("sort") || "featured";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [priceRange, setPriceRange] = useState(MAX_PRICE);
  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("category") || "All";
    const s = searchParams.get("sort") || "featured";
    setQuery(q);
    setActiveCategory(categories.includes(cat) ? cat : "All");
    setSort(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    list = list.filter((p) => p.price <= priceRange);
    return sortProducts(list, sort);
  }, [query, activeCategory, priceRange, sort]);

  const handleClear = () => {
    setQuery("");
    setActiveCategory("All");
    setPriceRange(MAX_PRICE);
    setSort("featured");
    setSearchParams({});
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next);
  };

  return (
    <div className="page shop">
      <div className="container-nexora">
        <div className="shop__header">
          <div>
            <h1 className="section-title">Explore <span className="grad-text">All Gear</span></h1>
            <p className="section-subtitle">Browse our full catalog of premium gaming hardware.</p>
          </div>
          <div className="shop__searchWrap">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
        <div className="shop__layout">
          <FilterPanel
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            maxPrice={MAX_PRICE}
            sort={sort}
            onSortChange={setSort}
            onClear={handleClear}
            resultCount={filtered.length}
          />
          <div className="shop__results">
            {filtered.length === 0 ? (
              <div className="shop__empty glass">
                <span aria-hidden="true">{"\uD83D\uDD0D"}</span>
                <h3>No products match your search</h3>
                <p>Try different keywords or clear your filters.</p>
                <button type="button" className="btn-nexora" onClick={handleClear}>Clear Filters</button>
              </div>
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
