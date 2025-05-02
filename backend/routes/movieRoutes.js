// routes/movieRoutes.js - API routes for movies
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

// Get all movies with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    
    // Build query with optional search
    const query = search 
      ? { title: { $regex: search, $options: 'i' } } 
      : {};
    
    const movies = await Movie.find(query)
      .select('title year poster imdb.rating')
      .sort({ year: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Movie.countDocuments(query);
    
    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single movie with its comments
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    const comments = await Comment.find({ movie_id: req.params.id })
      .sort({ date: -1 });
    
    res.json({ movie, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Also delete associated comments
    await Comment.deleteMany({ movie_id: req.params.id });
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// COMMENTS ROUTES
// Add a comment to a movie
router.post('/:id/comments', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }
    
    // Check if movie exists
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    const comment = new Comment({
      ...req.body,
      movie_id: req.params.id,
      date: new Date()
    });
    
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a comment
router.put('/comments/:commentId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment
router.delete('/comments/:commentId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;