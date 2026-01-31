import React, { useContext } from "react";
import "../styles/MovieCard.css";
import { MovieContext } from "../contexts/MovieContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useContext(MovieContext);
  const fav = isFavorite(movie.id);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card click if I add navigation later
    if (fav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <div className="movie-info-overlay">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
          </div>
          <button
            className={`favourite-btn ${fav ? "active" : ""}`}
            onClick={handleFavouriteClick}
            aria-label={fav ? "Remove from Favorites" : "Add to Favorites"}
          >
            {fav ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
