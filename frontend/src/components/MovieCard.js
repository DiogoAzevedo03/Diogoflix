import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie, onDelete }) {
  const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Image';

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
