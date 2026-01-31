import React from "react";
import "../styles/MovieCard.css";
import { AiOutlineHeart } from "react-icons/ai";

const SeriesCard = ({ series }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          loading="lazy"
        />

        <div className="movie-overlay">
          <div className="movie-info-overlay">
            <h3>{series.name}</h3>
            <p>{series.first_air_date?.split("-")[0]}</p>
          </div>
          <button
            // className={`favourite-btn ${fav ? "active" : ""}`}
            className="favourite-btn"
            onClick={""}
            // aria-label={fav ? "Remove from Favorites" : "Add to Favorites"}
          >
            {/* {fav ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />} */}
            {<AiOutlineHeart size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
