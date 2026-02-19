import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const SeriesCard = ({ series }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useContext(MovieContext);
  const fav = isFavorite(series.id, "series");

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fav) {
      removeFromFavorites(series.id, "series");
    } else {
      addToFavorites(series, "series");
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            series.poster_path
              ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={series.name}
          loading="lazy"
        />

        <div className="movie-overlay">
          <div className="movie-info-overlay">
            <h3>{series.name}</h3>
            <p>{series.first_air_date?.split("-")[0]}</p>
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

export default SeriesCard;
