import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import "../styles/Home.css";
import { fetchPopularMovies, searchMovies } from "../services/api";
import { BiSearch } from "react-icons/bi";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
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
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
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
    <div className="home-container">
      {/* Search Header - Floating Glassmorphic */}
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
      <div className="home-content">
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <div className="movies-grid">
            {[...Array(10)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="empty-search">
                <p>No movies found matching your search.</p>
              </div>
            ) : (
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
