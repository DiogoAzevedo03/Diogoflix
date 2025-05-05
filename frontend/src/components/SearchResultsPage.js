import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieSearch from '../components/MovieSearch';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const moviesPerPage = 10;

  useEffect(() => {
    // Reset when search query changes
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    
    if (query) {
      fetchMovies(1);
    }
  }, [query]);

  const fetchMovies = async (pageNum) => {
    if (!query || loading) return;
    
    setLoading(true);
    
    try {
      const data = await searchMovies(query, pageNum, moviesPerPage);
      
      if (pageNum === 1) {
        setMovies(data.movies || []);
      } else {
        setMovies(prev => [...prev, ...(data.movies || [])]);
      }
      
      // Check if we've reached the end of results
      setHasMore((data.movies || []).length === moviesPerPage);
      setPage(pageNum);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to load search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchMovies(page + 1);
    }
  };

  return (
    <div className="search-results-page">
      <div className="search-header">
        <h1>Movie Search</h1>
        <MovieSearch />
      </div>
      
      {query && (
        <div className="search-info">
          <h2>Results for "{query}"</h2>
          <p>{movies.length} movies found</p>
        </div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {!query && (
        <div className="empty-search">
          <p>Enter a search term to find movies</p>
        </div>
      )}

      {query && movies.length === 0 && !loading && !error && (
        <div className="no-results">
          <p>No movies found matching "{query}"</p>
          <p>Try adjusting your search terms or browse our catalog</p>
          <Link to="/" className="btn btn-primary">Browse All Movies</Link>
        </div>
      )}

      <div className="movie-grid">
        {movies.map(movie => (
          <Link to={`/movies/${movie._id}`} key={movie._id} className="movie-card">
            <div className="movie-poster">
              {movie.poster ? (
                <img 
                  src={movie.poster} 
                  alt={`${movie.title} poster`} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-poster.jpg';
                  }}
                />
              ) : (
                <div className="no-poster">
                  <span>{movie.title.substring(0, 1)}</span>
                </div>
              )}
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">{movie.year}</p>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      )}

      {hasMore && movies.length > 0 && !loading && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="btn btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;