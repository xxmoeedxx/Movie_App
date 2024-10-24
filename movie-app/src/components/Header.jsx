import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (<div>
     <header className="header-container">
      <h1>Movie Explorer</h1>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  </div>
  );
};

export default Header;
