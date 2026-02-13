import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesDetail } from "../services/api";
import "../styles/Detail.css";
import { FaStar, FaCalendar, FaClock, FaGlobe } from "react-icons/fa";
import noImage from "../assets/no-image.jpg";
import Slider from "../components/Slider";

const MoviesDetail = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadMoviesDetails = async () => {
      try {
        const data = await fetchMoviesDetail(id);
        setMovies(data);

        // Find official trailer
        const officialTrailer = data.videos?.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        setTrailer(officialTrailer);
      } catch (error) {
        console.log(error);
      }
    };

    loadMoviesDetails();
  }, [id]);

  if (!movies)
    return (
      <div className="detail-page loading-state">
        <div className="glass loading-box">Loading...</div>
      </div>
    );

  const formatCurrency = (value) => {
    // Approx conversion rate: 1 USD = 84 INR
    const inrValue = value * 84;

    if (inrValue >= 10000000) {
      return `₹${(inrValue / 10000000).toFixed(2)} Cr`;
    } else if (inrValue >= 100000) {
      return `₹${(inrValue / 100000).toFixed(2)} Lakh`;
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(inrValue);
  };

  const formatRuntime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  // Get Watch Providers (Prefer IN, fallback to US)
  const watchProvidersIN =
    movies?.["watch/providers"]?.results?.IN?.flatrate ||
    movies?.["watch/providers"]?.results?.IN?.buy;
  const watchProvidersUS =
    movies?.["watch/providers"]?.results?.US?.flatrate ||
    movies?.["watch/providers"]?.results?.US?.buy;
  const watchProviders = watchProvidersIN || watchProvidersUS;
  const providerRegion = watchProvidersIN ? "India" : "US";

  return (
    <div className="detail-page">
      {/* Hero Background */}
      <div className="hero-limit">
        <img
          src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
          alt={movies.title}
          className="hero-backdrop"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="detail-container">
        {/* Left Column: Poster */}
        <div className="poster-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            alt={movies.title}
            className="poster-image"
          />
        </div>

        {/* Right Column: Info */}
        <div className="info-section">
          {/* Title & Tagline */}
          <div className="title-section">
            <h1>{movies.title}</h1>
            {movies.tagline && <p className="tagline">"{movies.tagline}"</p>}
          </div>

          {/* Meta Data Row */}
          <div className="meta-row">
            <div className="rating-badge">
              <FaStar />
              <span>{movies.vote_average.toFixed(1)}</span>
              <span className="vote-count">({movies.vote_count})</span>
            </div>
            <div className="meta-item">
              <FaCalendar />
              <span>{movies.release_date?.split("-")[0]}</span>
            </div>
            <div className="meta-item">
              <FaClock />
              <span>{formatRuntime(movies.runtime)}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="genre-list">
            {movies.genres?.map((genre) => (
              <span key={genre.id} className="genre-badge">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className="overview-section">
            <h2>Overview</h2>
            <p className="overview-text">{movies.overview}</p>
          </div>

          {/* Top Cast (Responsive Grid) */}
          {movies.credits?.cast?.length > 0 && (
            <div className="cast-section">
              <h2>Top Cast</h2>
              <div className="cast-grid">
                {movies.credits.cast.slice(0, 5).map((actor) => (
                  <div key={actor.id} className="cast-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="cast-image"
                    />
                    <div className="cast-info">
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top crew (Responsive Grid) */}
          {movies.credits?.crew?.length > 0 && (
            <div className="cast-section">
              <h2>Top Crew</h2>
              <div className="cast-grid">
                {movies.credits.crew.slice(0, 5).map((actor) => (
                  <div key={actor.id} className="cast-card">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : noImage
                      }
                      alt={actor.name}
                      className="cast-image"
                    />
                    <div className="cast-info">
                      <p className="cast-name">{actor.job}</p>
                      <p className="cast-character">{actor.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="details-grid">
            <div className="detail-item">
              <h3>Budget</h3>
              <div className="detail-value">
                {movies.budget > 0 ? formatCurrency(movies.budget) : "N/A"}
              </div>
            </div>
            <div className="detail-item">
              <h3>Revenue</h3>
              <div className="detail-value">
                {movies.revenue > 0 ? formatCurrency(movies.revenue) : "N/A"}
              </div>
            </div>
            <div className="detail-item">
              <h3>Language</h3>
              <div className="detail-value">
                {movies.spoken_languages?.map((l) => l.english_name).join(", ")}
              </div>
            </div>

            <div className="detail-item">
              <h3>Production</h3>
              <div>
                {movies.production_companies?.slice(0, 1).map((company) => (
                  <div key={company.id}>
                    {company.logo_path ? (
                      <img
                        className="production-company-logo"
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        title={company.name}
                      />
                    ) : (
                      <span className="production-company-name">
                        {company.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Watch Providers (OTT) */}
            {watchProviders && watchProviders.length > 0 && (
              <div className="detail-item full-width">
                <h3>Watch On ({providerRegion})</h3>
                <div className="ott-list">
                  {watchProviders.map((provider) => (
                    <div key={provider.provider_id} className="ott-company">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="ott-logo"
                        title={provider.provider_name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Trailer */}
          {trailer && (
            <div className="trailer-section">
              <h2>Official Trailer</h2>
              <div className="video-responsive">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesDetail;
