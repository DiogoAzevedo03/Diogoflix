// src/components/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieById } from '../services/api';
import CommentList from './CommentList';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(id);
        setMovie(data.movie);
        setComments(data.comments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div>
      <Link to="/" className="back-button">← Back to Movies</Link>

      <div className="movie-details">
        <div className="movie-header">
          <img
            src={movie.poster || defaultPoster}
            alt={`${movie.title} poster`}
            className="movie-poster-large"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultPoster;
            }}
          />

          <div className="movie-header-info">
            <h1>{movie.title} {movie.year ? `(${movie.year})` : ''}</h1>

            {movie.imdb && movie.imdb.rating && (
              <div className="movie-metadata">
                <strong>Rating:</strong> ★ {movie.imdb.rating.toFixed(1)}
                {movie.imdb.votes && ` (${movie.imdb.votes.toLocaleString()} votes)`}
              </div>
            )}

            {movie.runtime && (
              <div className="movie-metadata">
                <strong>Runtime:</strong> {movie.runtime} minutes
              </div>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-metadata">
                <strong>Genres:</strong> {movie.genres.join(', ')}
              </div>
            )}

            {movie.directors && movie.directors.length > 0 && (
              <div className="movie-metadata">
                <strong>Director{movie.directors.length > 1 ? 's' : ''}:</strong> {movie.directors.join(', ')}
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div className="movie-metadata">
                <strong>Cast:</strong> {movie.cast.slice(0, 5).join(', ')}
                {movie.cast.length > 5 ? '...' : ''}
              </div>
            )}

            {movie.countries && movie.countries.length > 0 && (
              <div className="movie-metadata">
                <strong>Countries:</strong> {movie.countries.join(', ')}
              </div>
            )}
          </div>
        </div>

        {movie.plot && (
          <div>
            <h2>Plot</h2>
            <p>{movie.fullplot || movie.plot}</p>
          </div>
        )}

        <div className="comments-section">
          <h2>Comments ({comments.length})</h2>
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
