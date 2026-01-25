import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";
import { fetchPopularMovies, searchMovies } from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(movies);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to Search Movies...");
    } finally {
      setLoading(false);
    }
    // setSearchQuery("");
  };

  useEffect(() => {
    const loadPopularMoives = async () => {
      try {
        const populaMovies = await fetchPopularMovies();
        setMovies(populaMovies);
      } catch (error) {
        console.log(error);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMoives();
  }, []);
  return (
    <div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button ">
          Search
        </button>
      </form>
      <div className="home">
        {error && <p className="error-message">{error}</p>}
        {movies.length === 0 && <p>No movies found</p>}
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
