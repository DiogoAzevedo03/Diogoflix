import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies, deleteMovie } from '../services/api';
import MovieCard from './MovieCard';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadMovies();
  }, [currentPage]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies(currentPage);
      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Failed to load movies');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        // Refresh the movie list
        loadMovies();
      } catch (err) {
        setError('Failed to delete movie');
        console.error(err);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list-container">
      <div className="movie-list-header">
        <h1>Movies</h1>
        <Link to="/add-movie" className="btn btn-primary">Add New Movie</Link>
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onDelete={() => handleDeleteMovie(movie._id)}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>

      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="btn"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieList;