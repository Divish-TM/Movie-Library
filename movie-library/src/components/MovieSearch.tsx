import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Movie } from '../types/movieTypes';

interface Props {
  onSearch: (query: string) => void;
}

const MovieSearch: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Grid container spacing={2} style={{ margin: '1rem 0' }}>
      <Grid item xs={12} sm={9}>
        <TextField
          fullWidth
          label="Search Movies"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ height: '100%' }}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default MovieSearch;
