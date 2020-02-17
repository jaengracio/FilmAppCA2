const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },

  /**
  * Stores an array of IDs referencing characters.
  * This has a one-to-many relationship with Characters.
  */
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character'
    }
  ]
});

module.exports = mongoose.model('Group', GroupSchema, 'groups');
