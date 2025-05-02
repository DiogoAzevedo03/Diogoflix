import React from 'react';

const MovieCard = ({ movie, onClick, onDelete, onEdit }) => {
  const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="movie-card">
      <div className="movie-card-content" onClick={onClick}>
        <img
          src={movie.poster || defaultPoster}
          alt={`${movie.title} poster`}
          className="movie-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultPoster;
          }}
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-year">{movie.year}</div>
          {movie.imdb && (
            <div className="movie-rating">
              ★ {movie.imdb.rating ? movie.imdb.rating.toFixed(1) : 'N/A'}
            </div>
          )}
        </div>
      </div>

      <div className="movie-actions">
        {onEdit && (
          <button className="edit-button" onClick={onEdit}>
            Edit
          </button>
        )}
        {onDelete && (
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
