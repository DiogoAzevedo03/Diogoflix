const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  movie_id: {
    type: ObjectId,
    required: true,
    ref: 'Movie'
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  strict: false,
  collection: 'comments' // This ensures we connect to the existing 'comments' collection
});

module.exports = mongoose.model('Comment', commentSchema);