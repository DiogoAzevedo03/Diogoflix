import React, { useState, useEffect } from 'react';
import { saveMovie } from '../services/api';

const MovieForm = ({ movie = null, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [genres, setGenres] = useState('');
  const [directors, setDirectors] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setYear(movie.year || '');
      setPoster(movie.poster || '');
      setGenres((movie.genres || []).join(', '));
      setDirectors((movie.directors || []).join(', '));
    }
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const movieData = {
      title,
      year,
      poster,
      genres: genres.split(',').map((g) => g.trim()),
      directors: directors.split(',').map((d) => d.trim())
    };

    if (movie && movie._id) {
      movieData._id = movie._id;
    }

    try {
      await saveMovie(movieData);
      onSubmit();
    } catch (err) {
      alert('Error saving movie. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="Poster URL"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />

      <input
        type="text"
        placeholder="Genres (comma-separated)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
      />

      <input
        type="text"
        placeholder="Directors (comma-separated)"
        value={directors}
        onChange={(e) => setDirectors(e.target.value)}
      />

      <div style={{ marginTop: '10px' }}>
        <button type="submit">{movie ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
