const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  /**
  * Stores an ID of a group.
  * This has a one-to-many relationship with Groups.
  */
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },

  /**
  * Stores an array of IDs referencing films.
  * This creates a many-to-many relationship with Films.
  */
  films: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film'
    }
  ]
});

module.exports = mongoose.model('Character', CharacterSchema, 'characters');
