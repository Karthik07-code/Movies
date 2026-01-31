const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );

  const data = await res.json();
  return data.results;
};

export const fetchPopularSeries = async () => {
  const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
