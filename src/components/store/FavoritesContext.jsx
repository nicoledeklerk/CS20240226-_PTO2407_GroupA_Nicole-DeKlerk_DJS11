import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = (episode) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (fav) =>
          fav.showId === episode.showId &&
          fav.season === episode.season &&
          fav.episode === episode.episode
      );

      if (exists) {
        return prev.filter(
          (fav) =>
            !(
              fav.showId === episode.showId &&
              fav.season === episode.season &&
              fav.episode === episode.episode
            )
        );
      } else {
        const episodeWithTimestamp = {
          ...episode,
          addedAt: new Date().toISOString(), 
        };
        return [...prev, episodeWithTimestamp];
      }
    });
  };

  const isFavorite = (episode) =>
    favorites.some(
      (fav) =>
        fav.showId === episode.showId &&
        fav.season === episode.season &&
        fav.episode === episode.episode
    );

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
