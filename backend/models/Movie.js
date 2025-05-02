// models/Movie.js - MongoDB Movie model
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  runtime: Number,
  plot: String,
  poster: String,
  fullplot: String,
  genres: [String],
  countries: [String],
  directors: [String],
  cast: [String],
  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  },
  released: Date,
  awards: {
    wins: Number,
    nominations: Number,
    text: String
  }
}, { collection: 'movies' });

module.exports = mongoose.model('Movie', movieSchema);