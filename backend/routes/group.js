const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

let Group = require('../models/Group');

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

// Getting a list of groups
router.route('/').get((req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ', + err));
});

// Finding a specific group
router.route('/:id').get((req, res) => {
  const groupId = req.params.id;

  Group.findById(groupId)
    .populate('characters')
    .then(result => {
      if(!result) {
        return res.status(404).json({ message: "Group not found with id " + groupId });
      }

      res.json(result);
      })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({ message: "Group not found with id " + groupId });
      }

      return res.status(500).json({ message: "Error retrieving group with id " + groupId});
    });
});

// Creating a group
router.route('/').post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const group = req.body;

  if (token) {
    if(!group.name) {
      return res.status(404).json({ message: "Group name cannot be empty" });
    }

    const newGroup = new Group(group);

    newGroup.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('Error: ', + err));
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

// Editing a group
router.route('/:id').put(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const groupId = req.params.id;
  const newGroup = req.body;

  if (token) {
    if(!newGroup.name) {
      return res.status(400).json({ message: "Group name cannot be empty" });
    }

    Group.findByIdAndUpdate(groupId, newGroup, {new: true})
      .then(group => {
        if(!group) {
          return res.status(404).json({ message: "Group not found with id " + groupId });
        }

        res.json(group);
      })
      .catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ message: "Group not found with id " + groupId });
        }

        return res.status(500).json({ message: "Error updating group with id " + groupId});
      });
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

// Deleting a group
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const groupId = req.params.id;

  if (token) {
    Group.findByIdAndRemove(groupId)
      .then(group => {
        if(!group) {
          return res.status(404).json({ message: "Group not found with id " + groupId });
        }
          res.json({message: "Group deleted successfully!"});
      })
      .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).json({ message: "Group not found with id " + groupId });
        }

        return res.status(500).json({ message: "Error deleting a group with id " + groupId});
      });
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }
});

module.exports = router;
