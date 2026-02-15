import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import "../styles/listing.css";
import { fetchPopularMovies, searchMovies } from "../services/api";
import { BiSearch } from "react-icons/bi";
import { Link, useSearchParams } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [page, setPage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: searchQuery });
    setPage(1);
  };

  // Sync Input with URL (for back button navigation)
  useEffect(() => {
    setSearchQuery(query);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let newMovies = [];
        if (query) {
          newMovies = await searchMovies(query, page);
        } else {
          newMovies = await fetchPopularMovies(page);
        }

        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const uniqueNewMovies = newMovies.filter(
              (m) => !existingIds.has(m.id),
            );
            return [...prev, ...uniqueNewMovies];
          });
        }
      } catch (error) {
        console.log(error);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
        <div className="media-grid">
          {movies.length === 0 && !loading && !error ? (
            <div className="empty-search">
              <p>No movies found matching your search.</p>
            </div>
          ) : (
            <>
              {movies.map((movie) => (
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
              {loading &&
                [...Array(5)].map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
            </>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}

        {!loading && movies.length > 0 && (
          <div
            className="load-more-container"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <button className="site-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Movies;
