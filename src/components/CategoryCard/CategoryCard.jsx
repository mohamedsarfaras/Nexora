import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

const ICONS = {
  Keyboards: "\u2328", Mice: "\uD83D\uDDB1", Headsets: "\uD83C\uDFA7",
  Controllers: "\uD83C\uDFAE", Monitors: "\uD83D\uDDA5",
  Microphones: "\uD83C\uDF99", Accessories: "\u26A1",
};

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/shop?category=${encodeURIComponent(category)}`} className="cat-card">
      <span className="cat-card__icon" aria-hidden="true">{ICONS[category] || "\uD83C\uDFAE"}</span>
      <span className="cat-card__name">{category}</span>
      <span className="cat-card__arrow" aria-hidden="true">-&gt;</span>
    </Link>
  );
};

export default CategoryCard;
