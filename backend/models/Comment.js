// models/Comment.js - MongoDB Comment model
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  text: String,
  date: Date
}, { collection: 'comments' });

module.exports = mongoose.model('Comment', commentSchema);