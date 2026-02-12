import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import "../styles/listing.css";
import { fetchPopularMovies, searchMovies } from "../services/api";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (error) {
      console.log(error);
      setError("Failed to Search Movies...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovie = await fetchPopularMovies();
        setMovies(popularMovie);
      } catch (error) {
        console.log(error);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  return (
    <div className="listing-container">
      {/* Floating Search bar */}
      <section className="search-section">
        <form className="search-form glass" onSubmit={handleSearch}>
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </section>

      {/* Content Grid */}
      <section>
        {loading ? (
          <div className="media-grid">
            {[...Array(10)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="empty-search">
                <p>No movies found matching your search.</p>
              </div>
            ) : (
              <div className="media-grid">
                <>
                  {movies.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id}>
                      <MovieCard movie={movie} />
                    </Link>
                  ))}
                </>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Movies;
