const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

let Film = require('../models/Film');

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

//Getting a list of films
router.route('/').get((req, res) => {
  Film.find()
    .then(films => res.json(films))
    .catch(err => res.status(400).json('Error: ', + err));
});

//Finding a specific film
router.route('/:id').get((req, res) => {
  const filmId = req.params.id;

  Film.findById(filmId)
    .populate('characters')
    .then(result => {
      if(!result) {
        return res.status(404).json({ message: "Film not found with id " + filmId });
      }

      res.json(result);
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({ message: "Film not found with id " + filmId });
      }

      return res.status(500).json({ message: "Error retrieving film with id " + filmId});
    });
});

//Creating a film
router.route('/').post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const film = req.body;

  if (token) {
    if(!film.title) {
      return res.status(404).json({ message: "Film title cannot be empty" });
    }

    const newFilm = new Film(film);

    newFilm.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('Error: ', + err));
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized.' });
    }
});

//Editing a film
router.route('/:id').put(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const filmId = req.params.id;
  const newFilm = req.body;

  if (token) {
    if(!newFilm.title) {
      return res.status(404).json({ message: "Film title cannot be empty" });
    }

    Film.findByIdAndUpdate(filmId, newFilm, {new: true})
      .then(film => {
        if(!film) {
          return res.status(404).json({ message: "Film not found with id " + filmId });
        }

        res.json(film);
      })
      .catch(err => {
         if(err.kind === 'ObjectId') {
            return res.status(404).json({ message: "Film not found with id " + filmId });
         }

         return res.status(500).json({ message: "Error updating film with id " + filmId});
      });
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

//Deleting a film
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const filmId = req.params.id;

  if (token) {
    Film.findByIdAndRemove(filmId)
      .then(film => {
        if(!film) {
          return res.status(404).json({ message: "Film not found with id " + filmId });
        }

        res.json({message: "Film deleted successfully!"});
      })
      .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).json({ message: "Film not found with id " + filmId });
        }

        return res.status(500).json({ message: "Error deleting a film with id " + filmId});
      });
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

module.exports = router;
