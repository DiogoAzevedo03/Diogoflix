import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Movies API
export const fetchMovies = async (page = 1, limit = 20, search = '') => {
  try {
    const response = await axios.get(`${API_URL}/movies`, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, movieData);
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(`${API_URL}/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    console.error(`Error updating movie with id ${id}:`, error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting movie with id ${id}:`, error);
    throw error;
  }
};

// Comments API
export const addComment = async (movieId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/movies/${movieId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await axios.put(`${API_URL}/movies/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating comment with id ${commentId}:`, error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/movies/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment with id ${commentId}:`, error);
    throw error;
  }
};
export const saveMovie = async (movieData) => {
  try {
    if (movieData._id) {
      const response = await axios.put(`${API_URL}/movies/${movieData._id}`, movieData);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}/movies`, movieData);
      return response.data;
    }
  } catch (error) {
    console.error('Error saving movie:', error);
    throw error;
  }
};
