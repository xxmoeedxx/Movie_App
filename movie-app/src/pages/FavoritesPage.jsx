import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      <MovieList movies={favorites} />
    </div>
  );
};

export default FavoritesPage;
