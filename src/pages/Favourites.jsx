import React, { useContext } from "react";
import "../styles/Favourites.css";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../contexts/MovieContext";

const Favourites = () => {
  const { favorites } = useContext(MovieContext);

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites-container">
        <h2 className="section-title">Your Collection</h2>
        <div className="movies-grid mood-board">
          {favorites.map((movie, index) => (
            <div
              key={movie.id}
              className="mood-board-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-empty">
      <div className="empty-state-visual">
        <div className="ambient-glow"></div>
        {/* Simple CSS-based '3D' Box or Illustration */}
        <div className="empty-box">
          <div className="box-lid"></div>
          <div className="box-body"></div>
        </div>
      </div>
      <h2>Empty Collection</h2>
      <p>Start building your mood board by adding movies to favorites.</p>
    </div>
  );
};

export default Favourites;
