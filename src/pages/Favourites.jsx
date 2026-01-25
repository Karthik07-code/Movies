import React from "react";
import "../styles/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favourites = () => {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
  return (
    <div className="favourites-empty">
      <h2>No Favourite Movies Added Yet</h2>
      <p>Start Adding Favourite Movies Now</p>
    </div>
  );
};

export default Favourites;
