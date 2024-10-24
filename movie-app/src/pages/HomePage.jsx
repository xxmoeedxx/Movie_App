import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import axios from 'axios';
import "../index.css"; // General styling
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css'; // Add search bar styling here

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
      fetchMovies('avengers'); // Fetch avengers movies by default
    }
  }, []);

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Movie List */}
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
