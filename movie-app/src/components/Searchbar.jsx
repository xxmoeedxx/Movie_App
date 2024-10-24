import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

    const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
        // Redirect to home page with search query (for simplicity)
        navigate(`/?query=${query}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
        <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        </form>
    );
    };

export default SearchBar;
