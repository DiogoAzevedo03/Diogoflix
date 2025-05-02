import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, deleteMovie } from '../services/api';
import MovieCard from './MovieCard';
import MovieForm from './MovieForm';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const navigate = useNavigate();

  const fetchMoviesData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMovies(currentPage, 20, searchTerm);
      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleAddMovie = () => {
    setEditingMovie(null); // Add mode
    setShowForm(true);
  };

  const handleEditMovie = (movie, e) => {
    e.stopPropagation();
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setEditingMovie(null);
    await fetchMoviesData(); // Refresh list
  };

  const handleDeleteMovie = async (id, e) => {
    e.stopPropagation(); // Prevent navigating to movie details
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        await fetchMoviesData(); // Refresh list
      } catch (err) {
        setError('Failed to delete movie. Please try again.');
      }
    }
  };

  if (loading && movies.length === 0) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        <button onClick={handleAddMovie} className="add-button">Add New Movie</button>
      </div>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : movies.length === 0 ? (
        <div className="no-results">No movies found. Try a different search term.</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => handleMovieClick(movie._id)}
              onDelete={(e) => handleDeleteMovie(movie._id, e)}
              onEdit={(e) => handleEditMovie(movie, e)}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <MovieForm
              movie={editingMovie}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
