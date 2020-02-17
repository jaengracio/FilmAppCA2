const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

let Character = require('../models/Character');

const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Getting a list of characters
router.route('/').get((req, res) => {
  Character.find()
    .then(characters => res.json(characters))
    .catch(err => res.status(400).json('Error: ', + err));
});

// Finding a specific character
router.route('/:id').get((req, res) => {
  const characterId = req.params.id;

  Character.findById(characterId)
    .populate('films')
    .populate('groups')
    .then(result => {
      if(!result) {
        return res.status(404).json({ message: "Character not found with id " + characterId });
      }

      res.json(result);
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({ message: "Character not found with id " + characterId });
      }

      return res.status(500).json({ message: "Error retrieving character with id " + characterId});
    });
});

// Creating a character
router.route('/').post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const character = req.body;

  if (token) {
    if(!character.name) {
      return res.status(400).json({ message: "Character name cannot be empty" });
    }

    const newCharacter = new Character(character);

    newCharacter.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('Error: ', + err));
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

// Editing a character
router.route('/:id').put(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const characterId = req.params.id;
  const newCharacter = req.body;

  if (token) {
    if(!newCharacter.name) {
      return res.status(400).json({ message: "Character name cannot be empty" });
    }

    Character.findByIdAndUpdate(characterId, newCharacter, {new: true})
      .then(character => {
        if(!character) {
          return res.status(404).json({ message: "Character not found with id " + characterId });
        }

        res.json(character);
      })
      .catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ message: "Character not found with id " + characterId });
        }

        return res.status(500).json({ message: "Error updating character with id " + characterId});
      });
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

// Deleting a character
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const characterId = req.params.id;

  if (token) {
    Character.findByIdAndRemove(characterId)
      .then(character => {
        if(!character) {
          return res.status(404).json({ message: "Character not found with id " + characterId });
        }

        res.json({message: "Character deleted successfully!"});
      })
      .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).json({ message: "Character not found with id " + characterId });
        }

        return res.status(500).json({ message: "Error deleting a character with id " + characterId});
      });
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

module.exports = router;
