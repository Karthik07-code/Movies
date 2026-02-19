import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie, type = "movie") => {
    setFavorites((prev) => [...prev, { ...movie, type }]);
    toast.success("Added to Favorites!", { id: "addToFavorites" });
  };

  const removeFromFavorites = (movieId, type = "movie") => {
    setFavorites((prev) =>
      prev.filter(
        (item) => !(item.id === movieId && (item.type || "movie") === type),
      ),
    );
    toast.success("Removed from Favorites", { id: "removeFromFavorites" });
  };

  const isFavorite = (movieId, type = "movie") => {
    return favorites.some(
      (item) => item.id === movieId && (item.type || "movie") === type,
    );
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
