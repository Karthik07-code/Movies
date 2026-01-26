import React from "react";
import "../styles/SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="movie-card skeleton-card">
      <div className="skeleton-poster"></div>
      <div className="skeleton-text title"></div>
      <div className="skeleton-text subtitle"></div>
    </div>
  );
};

export default SkeletonCard;
