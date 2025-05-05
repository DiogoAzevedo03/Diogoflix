import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieById, createMovie, updateMovie } from '../services/api';

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    runtime: '',
    plot: '',
    poster: '',
    genres: '',
    directors: '',
    cast: '',
    countries: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      if (isEditMode) {
        try {
          const movie = await fetchMovieById(id);
          setFormData({
            title: movie.title || '',
            year: movie.year || '',
            runtime: movie.runtime || '',
            plot: movie.plot || '',
            poster: movie.poster || '',
            genres: movie.genres ? movie.genres.join(', ') : '',
            directors: movie.directors ? movie.directors.join(', ') : '',
            cast: movie.cast ? movie.cast.join(', ') : '',
            countries: movie.countries ? movie.countries.join(', ') : ''
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to load movie data');
          setLoading(false);
          console.error(err);
        }
      }
    };

    loadMovie();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Process arrays from comma-separated strings
      const processedData = {
        ...formData,
        year: formData.year ? parseInt(formData.year, 10) : undefined,
        runtime: formData.runtime ? parseInt(formData.runtime, 10) : undefined,
        genres: formData.genres ? formData.genres.split(',').map(item => item.trim()).filter(Boolean) : [],
        directors: formData.directors ? formData.directors.split(',').map(item => item.trim()).filter(Boolean) : [],
        cast: formData.cast ? formData.cast.split(',').map(item => item.trim()).filter(Boolean) : [],
        countries: formData.countries ? formData.countries.split(',').map(item => item.trim()).filter(Boolean) : []
      };

      if (isEditMode) {
        await updateMovie(id, processedData);
      } else {
        await createMovie(processedData);
      }
      
      navigate('/');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} movie`);
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="form-container">
      <h1>{isEditMode ? 'Edit Movie' : 'Add New Movie'}</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="runtime">Runtime (minutes)</label>
            <input
              type="number"
              id="runtime"
              name="runtime"
              value={formData.runtime}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="poster">Poster URL</label>
          <input
            type="url"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="plot">Plot</label>
          <textarea
            id="plot"
            name="plot"
            value={formData.plot}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="genres">Genres (comma separated)</label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            placeholder="e.g. Drama, Action, Comedy"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="directors">Directors (comma separated)</label>
          <input
            type="text"
            id="directors"
            name="directors"
            value={formData.directors}
            onChange={handleChange}
            placeholder="e.g. Steven Spielberg, James Cameron"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cast">Cast (comma separated)</label>
          <input
            type="text"
            id="cast"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            placeholder="e.g. Tom Hanks, Meryl Streep"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="countries">Countries (comma separated)</label>
          <input
            type="text"
            id="countries"
            name="countries"
            value={formData.countries}
            onChange={handleChange}
            placeholder="e.g. USA, Canada, UK"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Update Movie' : 'Add Movie'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;