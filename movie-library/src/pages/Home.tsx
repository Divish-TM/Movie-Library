import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import MovieSearch from '../components/MovieSearch';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movieTypes';
import { Grid } from '@mui/material';

interface Props {
  onAddToWatchList: (movie: Movie) => void;
  onMarkAsWatched: (movie: Movie, rating: number) => void;
}

const Home: React.FC<Props> = ({ onAddToWatchList, onMarkAsWatched }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchRandomMovies = async () => {
      const response = await fetchMovies(searchQuery || 'action'); // Default search query 'action'
      setMovies(response.Search || []);
    };
    fetchRandomMovies();
  }, [searchQuery]);

  return (
    <div>
      <MovieSearch onSearch={setSearchQuery} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
            <MovieCard
              movie={movie}
              onAddToWatchList={onAddToWatchList}
              onMarkAsWatched={onMarkAsWatched}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
