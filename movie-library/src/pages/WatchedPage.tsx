import React from 'react';
import { Movie } from '../types/movieTypes';
import MovieCard from '../components/MovieCard';

interface Props {
  watchedMovies: Movie[];
  onRemoveFromWatched: (id: string) => void;
}

const WatchedPage: React.FC<Props> = ({ watchedMovies, onRemoveFromWatched }) => {
  return (
    <div>
      <h2>Your Watched Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {watchedMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onRemoveFromWatchList={onRemoveFromWatched}
            isInWatchList={false}  // Corrected the prop type to match movieCard
          />
        ))}
      </div>
    </div>
  );
};

export default WatchedPage;
