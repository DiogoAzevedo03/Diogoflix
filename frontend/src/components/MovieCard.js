import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie, onDelete }) {
  // Define an inline SVG placeholder - this will work without external dependencies
  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23999999'%3ENo Image%3C/text%3E%3C/svg%3E`;

  // Reliable alternate public placeholder service (if you prefer external service)
  // const defaultPoster = 'https://placehold.co/300x450?text=No+Image';
  
  // Use the SVG placeholder
  const defaultPoster = placeholderSvg;

  return (
    <div className="movie-card">
      <img 
        src={movie.poster || defaultPoster} 
        alt={movie.title} 
        className="movie-poster"
        onError={(e) => {e.target.src = defaultPoster}}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year || 'Unknown year'}</p>
        {movie.genres && movie.genres.length > 0 && (
          <p className="genres">{movie.genres.join(', ')}</p>
        )}
        <div className="movie-actions">
          <Link to={`/movies/${movie._id}`} className="btn btn-view">View</Link>
          <Link to={`/edit-movie/${movie._id}`} className="btn btn-edit">Edit</Link>
          <button onClick={onDelete} className="btn btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;