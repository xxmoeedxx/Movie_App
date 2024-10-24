import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/Searchbar';
import axios from 'axios';
import "../index.css";
import { useNavigate } from 'react-router-dom';

  
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (e) => {
      e.preventDefault();
      fetchMovies(query);
    };
  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://omdbapi.com/?apikey=23eb8b7a&s=${query}`);  
      setMovies(response.data.Search || []);
      setError(null);
      navigate(`/?query=${query}`);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
      fetchMovies(query);
      
    } else {
      fetchMovies('trending'); // Fetch trending movies by default
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => {setQuery(e.target.value)}}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
