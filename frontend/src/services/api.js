import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://diogoflix.onrender.com/api';

const api = axios.create({
  baseURL: API_URL
});

// Movie API calls
export const fetchMovies = async (page = 1, limit = 10) => {
  const response = await api.get(`/movies?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const createMovie = async (movieData) => {
  const response = await api.post('/movies', movieData);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/movies/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
};

// Comment API calls
export const fetchComments = async (movieId) => {
  const response = await api.get(`/movies/${movieId}/comments`);
  return response.data;
};

export const addComment = async (movieId, commentData) => {
  const response = await api.post(`/movies/${movieId}/comments`, commentData);
  return response.data;
};

export const updateComment = async (commentId, commentData) => {
  const response = await api.put(`/comments/${commentId}`, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};