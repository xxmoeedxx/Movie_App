import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        console.log(id);
        const response = await axios.get(`https://omdbapi.com/?apikey=23eb8b7a&i=${id}`);
        console.log(response.data);
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
    <div>
      {movie && (
        <>
          <h1>{movie.Title}</h1>
          <p>Release Date: {movie.Released}</p>
          <p>Rating: {movie.imdbRating}</p>
          <p>Plot: {movie.Plot}</p>
            <img src={movie.Poster} alt={movie.Title} />
              <p>Genre: {movie.Genre}</p>
              <p>Director: {movie.Director}</p>
              <p>Actors: {movie.Actors}</p>
              <p>Runtime: {movie.Runtime}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
