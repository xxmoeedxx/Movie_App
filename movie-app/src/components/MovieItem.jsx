import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import "../styles/MovieList.css";

const MovieItem = ({ movie }) => {
    const { addFavorite, removeFavorite, favorites,isFavorite } = useContext(FavoritesContext);

    const handleClick = (movie) => {
        if (isFavorite(movie.imdbID)) {
            console.log('removing favorite');
            removeFavorite(movie.imdbID);
        } else {
            console.log('adding favorite');
            addFavorite(movie);
        }
    };
return (
    <Link to={`/movie/${movie.imdbID}`} className='movie-item'>
        <h3 className='movie-title'>{movie.Title}
        <button className='heart-button' onClick={(e) => { e.preventDefault(); handleClick(movie); }}>
            {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
        </button>
        </h3>
        
        {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
        ) : (
            <img src="/placeholder-image.png" alt="No poster available" />
        )}
    </Link>
);
};

export default MovieItem;
