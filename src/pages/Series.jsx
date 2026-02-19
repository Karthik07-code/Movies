import React, { useEffect, useState } from "react";
import { fetchPopularSeries, searchSeries } from "../services/api";
import "../styles/MovieCard.css";
import "../styles/listing.css";
import SeriesCard from "../components/SeriesCard";
import SkeletonCard from "../components/SkeletonCard";
import { Link, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Sync Input with URL
  useEffect(() => {
    setSearchQuery(query);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const loadSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        let newSeries = [];
        if (query) {
          newSeries = await searchSeries(query, page);
        } else {
          newSeries = await fetchPopularSeries(page);
        }

        if (page === 1) {
          setSeries(Array.isArray(newSeries) ? newSeries : []);
        } else {
          setSeries((prev) => {
            const existingIds = new Set(prev.map((s) => s.id));
            const uniqueNewSeries = (newSeries || []).filter(
              (s) => !existingIds.has(s.id),
            );
            return [...prev, ...uniqueNewSeries];
          });
        }
      } catch (error) {
        console.log(error);
        setError("Failed to Load Series...");
        if (page === 1) setSeries([]);
      } finally {
        setLoading(false);
      }
    };
    loadSeries();
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
            placeholder="Search for Series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </section>
      <section>
        <div className="media-grid">
          {series.length === 0 && !loading && !error ? (
            <p className="empty-search">No series found</p>
          ) : (
            <>
              {series.map((item, index) => (
                <Link
                  to={`/series/${item.id}`}
                  key={item.id}
                  className="animate-card"
                  style={{ animationDelay: `${(index % 20) * 0.05}s` }}
                >
                  <SeriesCard series={item} />
                </Link>
              ))}
              {loading &&
                [...Array(5)].map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
            </>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}

        {!loading && series.length > 0 && (
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

export default Series;
