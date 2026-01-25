import React from "react";
import "../styles/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const fav = isFavorite(movie.id);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    if (fav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div>
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button
              className={`favourite-btn ${fav ? "active" : ""}`}
              onClick={handleFavouriteClick}
            >
              <AiFillHeart size={28} />
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>{movie.release_date.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
