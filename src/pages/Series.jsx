import React, { useEffect, useState } from "react";
import { fetchPopularSeries, searchSeries } from "../services/api";
import "../styles/MovieCard.css";
import SeriesCard from "../components/SeriesCard";
import SkeletonCard from "../components/SkeletonCard";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchSeries(searchQuery);
      setSeries(searchResults);
    } catch (error) {
      console.log(error);
      setError("Failed to Search Series...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPopularSeries = async () => {
      setLoading(true);
      try {
        const popularSeries = await fetchPopularSeries();
        setSeries(popularSeries);
      } catch (error) {
        setError("Failed to Load Series...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularSeries();
  }, []);

  return (
    <div className="listing-container">
      {/* Floating Search bar */}
      <section className="search-section">
        <form className="search-form glass" onSubmit={handleSearch}>
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for Series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </section>
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
            {series.length === 0 ? (
              <p className="empty-search">No series found</p>
            ) : (
              <div className="media-grid">
                {series.map((item) => (
                  <Link to={`/series/${item.id}`} key={item.id}>
                    <SeriesCard series={item} />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Series;
