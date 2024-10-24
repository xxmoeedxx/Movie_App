import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { FavoritesProvider } from './context/FavoritesContext';


function App() {
  return (<>
    <Router>
      <Header />
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </FavoritesProvider>
      <Footer />
    </Router>
  </>
  );
}

export default App;
