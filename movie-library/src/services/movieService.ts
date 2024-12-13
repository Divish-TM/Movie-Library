import axios from 'axios';

const API_KEY = 'f3995507'; // Your API key for OMDB

export const fetchMovies = async (query: string) => {
  const url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
