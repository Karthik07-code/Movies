import React, { useContext } from "react";
import "../styles/Favourites.css";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../contexts/MovieContext";

const Favourites = () => {
  const { favorites } = useContext(MovieContext);
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
