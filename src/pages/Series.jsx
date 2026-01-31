import React, { useEffect, useState } from "react";
import { fetchPopularSeries } from "../services/api";
import "../styles/MovieCard.css";
import SeriesCard from "../components/SeriesCard";

const Series = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const loadPopularSeries = async () => {
      const popularSeries = await fetchPopularSeries();
      console.log(popularSeries);
      setSeries(popularSeries);
    };
    loadPopularSeries();
  }, []);

  return (
    <div>
      <h1>Series</h1>
      {series.map((item) => (
        <div key={item.id}>
          <SeriesCard series={item} />
        </div>
      ))}
    </div>
  );
};

export default Series;
