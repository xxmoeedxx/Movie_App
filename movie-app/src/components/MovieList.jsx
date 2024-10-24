import MovieItem from './MovieItem';
import "../styles/MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className='movie-list'>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
