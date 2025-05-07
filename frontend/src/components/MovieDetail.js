import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchMovieById, deleteMovie } from '../services/api';
import CommentList from './CommentList';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define an inline SVG placeholder - this will work without external dependencies
  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23999999'%3ENo Image%3C/text%3E%3C/svg%3E`;
  
  // Use the SVG placeholder
  const defaultPoster = placeholderSvg;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
        console.error(err);
      }
    };

    loadMovie();
  }, [id]);

  const handleDeleteMovie = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete movie');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="movie-detail-container">
      <div className="movie-detail">
        <div className="movie-header">
          <h1>{movie.title}</h1>
          <div className="movie-actions">
            <Link to="/" className="btn">Back to Movies</Link>
            <Link to={`/edit-movie/${movie._id}`} className="btn btn-edit">Edit</Link>
            <button onClick={handleDeleteMovie} className="btn btn-delete">Delete</button>
          </div>
        </div>

        <div className="movie-content">
          <div className="movie-poster-container">
            <img 
              src={movie.poster || defaultPoster} 
              alt={movie.title} 
              className="movie-detail-poster"
              onError={(e) => {e.target.src = defaultPoster}}
            />
          </div>

          <div className="movie-info-detail">
            <div className="info-row">
              <span className="info-label">Released:</span>
              <span>{formatDate(movie.released)}</span>
            </div>
            
            {movie.runtime && (
              <div className="info-row">
                <span className="info-label">Runtime:</span>
                <span>{movie.runtime} minutes</span>
              </div>
            )}
            
            {movie.rated && (
              <div className="info-row">
                <span className="info-label">Rated:</span>
                <span>{movie.rated}</span>
              </div>
            )}
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="info-row">
                <span className="info-label">Genres:</span>
                <span>{movie.genres.join(', ')}</span>
              </div>
            )}
            
            {movie.directors && movie.directors.length > 0 && (
              <div className="info-row">
                <span className="info-label">Directors:</span>
                <span>{movie.directors.join(', ')}</span>
              </div>
            )}
            
            {movie.cast && movie.cast.length > 0 && (
              <div className="info-row">
                <span className="info-label">Cast:</span>
                <span>{movie.cast.join(', ')}</span>
              </div>
            )}
            
            {movie.countries && movie.countries.length > 0 && (
              <div className="info-row">
                <span className="info-label">Countries:</span>
                <span>{movie.countries.join(', ')}</span>
              </div>
            )}
            
            {movie.plot && (
              <div className="plot-section">
                <h3>Plot</h3>
                <p>{movie.plot}</p>
              </div>
            )}
            
            {movie.fullplot && movie.fullplot !== movie.plot && (
              <div className="plot-section">
                <h3>Full Plot</h3>
                <p>{movie.fullplot}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <CommentList movieId={id} />
      </div>
    </div>
  );
}

export default MovieDetail;