import { useParams } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { FavoritesContext } from '../context/FavoritesContext'; 
import '../styles/MovieDetailsPage.css';
const MovieDetailsPage = () => {
const { id } = useParams();
const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);


const handleFavoriteToggle = (movie) => {
    if (isFavorite(movie.imdbID)) {
        console.log('removing favorite');
        removeFavorite(movie.imdbID);
    } else {
        console.log('adding favorite');
        addFavorite(movie);
    }
};


  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://omdbapi.com/?apikey=23eb8b7a&i=${id}`);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

return (
    <div className="movie-details-container">
        {movie && (
            <div className="movie-details">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-image.png'}
                    alt={movie.Title}
                    className="movie-poster"
                />
                <div className="movie-info">
                    <h1 className="movie-title">{movie.Title}</h1>
                    <p className="movie-meta">
                        Release Date: {movie.Released} | Rating: {movie.imdbRating} | Runtime: {movie.Runtime}
                    </p>
                    <p className="movie-description">Genre: {movie.Genre}</p>
                    <p className="movie-description">Director: {movie.Director}</p>
                    <p className="movie-description">Actors: {movie.Actors}</p>
                    <p className="movie-plot">{movie.Plot}</p>
                    <button onClick={()=>handleFavoriteToggle(movie)} className={isFavorite(movie.imdbID) ? 'remove-favorites' : 'add-favorites'}>
                        {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        )}
    </div>
);
};

export default MovieDetailsPage;
