import React from 'react';
import { Movie } from '../types/movieTypes';
import MovieCard from '../components/MovieCard';

interface Props {
  watchList: Movie[];
  onRemoveFromWatchList: (id: string) => void;
}

const WatchlistPage: React.FC<Props> = ({ watchList, onRemoveFromWatchList }) => {
  return (
    <div>
      <h2>Your Watchlist</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {watchList.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onRemoveFromWatchList={onRemoveFromWatchList}
            isInWatchList={true}  // Corrected the prop type to match movieCard
          />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
