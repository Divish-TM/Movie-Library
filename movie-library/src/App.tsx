import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WatchlistPage from './pages/WatchlistPage';
import WatchedPage from './pages/WatchedPage';
import { Movie } from './types/movieTypes';

const App: React.FC = () => {
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);

  // Load watchlist and watched movies from localStorage
  useEffect(() => {
    const storedWatchList = localStorage.getItem('watchList');
    const storedWatchedMovies = localStorage.getItem('watchedMovies');

    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }

    if (storedWatchedMovies) {
      setWatchedMovies(JSON.parse(storedWatchedMovies));
    }
  }, []);

  // Save watchlist and watched movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('watchList', JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  const addToWatchList = (movie: Movie) => {
    if (!watchList.find((m) => m.imdbID === movie.imdbID)) {
      setWatchList([...watchList, movie]);
    }
  };

  const markAsWatched = (movie: Movie, rating: number) => {
    if (!watchedMovies.find((m) => m.imdbID === movie.imdbID)) {
      setWatchedMovies([...watchedMovies, { ...movie, Rating: rating }]);
    }
    setWatchList(watchList.filter((m) => m.imdbID !== movie.imdbID));
  };

  const removeFromWatchList = (id: string) => {
    setWatchList(watchList.filter((movie) => movie.imdbID !== id));
  };

  const removeFromWatched = (id: string) => {
    setWatchedMovies(watchedMovies.filter((movie) => movie.imdbID !== id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home onAddToWatchList={addToWatchList} onMarkAsWatched={markAsWatched} />}
        />
        <Route
          path="/watchlist"
          element={<WatchlistPage watchList={watchList} onRemoveFromWatchList={removeFromWatchList} />}
        />
        <Route
          path="/watched"
          element={<WatchedPage watchedMovies={watchedMovies} onRemoveFromWatched={removeFromWatched} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
