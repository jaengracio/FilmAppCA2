const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  release_date: {
    type: String,
    required: true
  },
  film_version: {
    type: String,
    required: true
  },

  /**
  * Stores an array of IDs referencing characters.
  * This creates a many-to-many relationship with Characters.
  */
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character'
    }
  ]
});

module.exports = mongoose.model('Film', FilmSchema, 'films');
