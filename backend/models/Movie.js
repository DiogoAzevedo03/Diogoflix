const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number
  },
  runtime: {
    type: Number
  },
  released: {
    type: Date
  },
  poster: {
    type: String
  },
  plot: {
    type: String
  },
  fullplot: {
    type: String
  },
  type: {
    type: String,
    default: 'movie'
  },
  directors: {
    type: [String]
  },
  cast: {
    type: [String]
  },
  countries: {
    type: [String]
  },
  genres: {
    type: [String]
  },
  rated: {
    type: String
  },
  lastupdated: {
    type: Date,
    default: Date.now
  }
}, {
  // This is important for the sample_mflix dataset as MongoDB may have fields not defined in our schema
  strict: false,
  collection: 'movies' // This ensures we connect to the existing 'movies' collection
});

module.exports = mongoose.model('Movie', movieSchema);