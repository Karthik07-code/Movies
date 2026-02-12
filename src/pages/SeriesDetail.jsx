import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSeriesDetail } from "../services/api";
import "../styles/Detail.css";
import { FaStar, FaCalendar, FaTv, FaPlay } from "react-icons/fa";
import noImage from "../assets/no-image.jpg";

const SeriesDetail = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadSeriesDetails = async () => {
      try {
        const data = await fetchSeriesDetail(id);
        setSeries(data);

        const officialTrailer = data.videos?.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        setTrailer(officialTrailer);
      } catch (error) {
        console.log(error);
      }
    };

    loadSeriesDetails();
  }, [id]);

  if (!series)
    return (
      <div
        className="detail-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="glass"
          style={{ padding: "2rem", borderRadius: "1rem" }}
        >
          Loading...
        </div>
      </div>
    );

  return (
    <div className="detail-page">
      {/* Hero Background */}
      <div className="hero-limit">
        <img
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          alt={series.name}
          className="hero-backdrop"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="detail-container">
        {/* Left Column: Poster */}
        <div className="poster-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
            className="poster-image"
          />
        </div>

        {/* Right Column: Info */}
        <div className="info-section">
          {/* Title & Tagline */}
          <div className="title-section">
            <h1>{series.name}</h1>
            {series.tagline && <p className="tagline">"{series.tagline}"</p>}
          </div>
          {/* Meta Data Row */}
          <div className="meta-row">
            <div className="rating-badge">
              <FaStar />
              <span>{series.vote_average.toFixed(1)}</span>
              <span>|</span>
              <span>{series.vote_count}</span>
            </div>
            <div className="meta-item">
              <FaCalendar />
              <span>{series.first_air_date?.split("-")[0]}</span>
            </div>
            <div className="meta-item">
              <FaTv />
              <span>{series.number_of_seasons} Seasons</span>
            </div>
            <div className="meta-item">
              <span>{series.number_of_episodes} Episodes</span>
            </div>
          </div>
          {/* Genres */}
          <div className="genre-list">
            {series.genres?.map((genre) => (
              <span key={genre.id} className="genre-badge">
                {genre.name}
              </span>
            ))}
          </div>
          {/* Overview */}
          <div className="overview-section">
            <h2>Overview</h2>
            <p className="overview-text">{series.overview}</p>
          </div>
          {/* Top Cast (Responsive Grid) */}
          {series.credits?.cast?.length > 0 && (
            <div className="cast-section">
              <h2>Top Cast</h2>
              <div className="cast-grid">
                {series.credits.cast.slice(0, 10).map((actor) => (
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
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Top crew (Responsive Grid) */}
          {series.credits?.crew?.length > 0 && (
            <div className="cast-section">
              <h2>Top Crew</h2>
              <div className="cast-grid">
                {series.credits.crew.slice(0, 10).map((actor) => (
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
            {/* Created By */}
            {/* {series.created_by?.length > 0 && (
              <div className="detail-item">
                <h3>Created By</h3>
                <div className="detail-value">
                  {series.created_by.map((c) => c.name).join(", ")}
                </div>
              </div>
            )} */}

            {/* Network Providers (OTT)*/}
            <div className="detail-item">
              <h3>Watch On</h3>
              <div className="networks-list">
                {series.networks?.map((network) => (
                  <img
                    key={network.id}
                    src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                    alt={network.name}
                    className="network-logo"
                    title={network.name}
                  />
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="detail-item">
              <h3>Language</h3>
              <div className="detail-value">
                {series.spoken_languages?.map((l) => l.name).join(", ")}
              </div>
            </div>

            {/* Production */}
            <div className="detail-item">
              <h3>Production</h3>
              <div className="detail-value">
                {series.production_companies?.slice(0, 1).map((company) => (
                  <div key={company.id}>
                    <img
                      className="production-company-logo"
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      title={company.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Trailer */}
          {trailer && (
            <div className="trailer-section">
              <h2>Official Trailer</h2>
              <div className="video-responsive">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
