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
  // const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchSeriesDetail = async (id) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );
  const data = await res.json();
  console.log(data);

  return data;
};

export const fetchMoviesDetail = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`,
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export const searchSeries = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`,
  );

  const data = await res.json();
  return data.results;
};
