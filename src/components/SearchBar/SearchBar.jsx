import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
  return (
    <div className="sbar">
      <span className="sbar__icon" aria-hidden="true">{"\u2315"}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label="Search products" />
      {value && (
        <button type="button" className="sbar__clear" onClick={() => onChange("")} aria-label="Clear search">{"\u00D7"}</button>
      )}
    </div>
  );
};

export default SearchBar;
