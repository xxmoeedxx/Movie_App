import { Link } from 'react-router-dom';
import "../styles/MovieList.css";

const MovieItem = ({ movie }) => {
  return (
    <div className='movie-item'>
      <h3 className='movie-title'>{movie.Title}</h3>
      <p>Release Year: {movie.Year}</p>
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <img src={movie.Poster} alt={movie.Title} />
      ) : (
        <img src="/placeholder-image.png" alt="No poster available" />
      )}
      <Link to={`/movie/${movie.imdbID}`} className='details-link'>
        View Details
      </Link>
    </div>
  );
};

export default MovieItem;
