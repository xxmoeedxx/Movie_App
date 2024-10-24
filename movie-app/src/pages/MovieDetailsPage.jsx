import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MovieDetailsPage.css';

const MovieDetailsPage = () => {
const { id } = useParams();
const [isFavorite, setIsFavorite] = useState(false);

useEffect(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setIsFavorite(favoriteMovies.includes(id));
}, [id]);

const handleFavoriteToggle = () => {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (isFavorite) {
        const updatedFavorites = favoriteMovies.filter(movieId => movieId !== id);
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    } else {
        favoriteMovies.push(id);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
    setIsFavorite(!isFavorite);
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
                    <button onClick={handleFavoriteToggle} className={isFavorite ? 'remove-favorites' : 'add-favorites'}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        )}
    </div>
);
};

export default MovieDetailsPage;
