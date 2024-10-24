import { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  // const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
  const isFavorite = (id) => {
    console.log(favorites);
    console.log(id);
    return favorites.some((movie) => movie.imdbID === id);
  };

  const addFavorite = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((movie) => movie.imdbID !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites,isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
