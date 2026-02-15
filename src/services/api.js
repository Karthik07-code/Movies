const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to search movies");

  const data = await res.json();
  return data.results;
};

export const fetchPopularSeries = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch popular series");
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

export const searchSeries = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to search series");

  const data = await res.json();
  return data.results;
};
