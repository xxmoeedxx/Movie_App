import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Movie Explorer</h1>
    <nav>
      <Link to="/?query=trending">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  </header>
);

export default Header;
