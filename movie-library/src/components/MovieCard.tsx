import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Select, MenuItem } from '@mui/material';
import { Movie } from '../types/movieTypes';

interface Props {
  movie: Movie;
  onAddToWatchList?: (movie: Movie) => void;
  onMarkAsWatched?: (movie: Movie, rating: number) => void;
  isInWatchList?: boolean;
  isInWatched?: boolean;
  onRemoveFromWatchList?: (id: string) => void;
}

const MovieCard: React.FC<Props> = ({ movie, onAddToWatchList, onMarkAsWatched, isInWatchList, isInWatched, onRemoveFromWatchList }) => {
  const [rating, setRating] = useState<number>(0);

  const handleMarkAsWatched = () => {
    if (rating > 0) {
      onMarkAsWatched?.(movie, rating);
    } else {
      alert('Please select a rating before marking as watched!');
    }
  };

  return (
    <Card style={{ margin: '1rem', maxWidth: '300px' }}>
      <CardMedia component="img" height="400" image={movie.Poster} alt={movie.Title} />
      <CardContent>
        <Typography variant="h6">{movie.Title} ({movie.Year})</Typography>
        {onAddToWatchList && !isInWatchList && !isInWatched && (
          <Button variant="contained" color="primary" onClick={() => onAddToWatchList(movie)}>
            Add to Watchlist
          </Button>
        )}
        {onRemoveFromWatchList && isInWatchList && !isInWatched && (
          <Button variant="outlined" color="secondary" onClick={() => onRemoveFromWatchList?.(movie.imdbID)}>
            Remove from Watchlist
          </Button>
        )}
        {onMarkAsWatched && !isInWatchList && !isInWatched && (
          <>
            <Select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              displayEmpty
              style={{ margin: '1rem 0' }}
            >
              <MenuItem value={0} disabled>Select Rating</MenuItem>
              {[1, 2, 3, 4, 5].map((rate) => (
                <MenuItem key={rate} value={rate}>{rate}</MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="secondary" onClick={handleMarkAsWatched}>
              Mark as Watched
            </Button>
          </>
        )}
        {isInWatched && (
          <Typography variant="body2" color="textSecondary">
            Rating: {movie.Rating || 'Not rated'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
