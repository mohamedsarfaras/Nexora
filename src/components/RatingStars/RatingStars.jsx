import React from "react";

const RatingStars = ({ rating = 0, reviews = null, size = "sm" }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const starStyle = {
    color: "#ffb800",
    fontSize: size === "lg" ? "1.15rem" : size === "md" ? "1rem" : "0.85rem",
    letterSpacing: "1px",
  };
  return (
    <div className="d-flex align-items-center gap-2">
      <span style={starStyle} aria-label={`Rated ${rating} out of 5`}>
        {"\u2605".repeat(full)}
        {half ? "\u2BE8" : ""}
        {"\u2606".repeat(empty)}
      </span>
      <span className="text-muted-2" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
        {rating.toFixed(1)}
        {reviews !== null && (
          <span className="text-muted-3" style={{ fontWeight: 500 }}> ({reviews})</span>
        )}
      </span>
    </div>
  );
};

export default RatingStars;
