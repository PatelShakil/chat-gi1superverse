const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const auth = require('../middleware/auth');

// @route   POST api/groups
// @desc    Create a new group
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, members } = req.body;

  try {
    const newGroup = new Group({
      name,
      members: [...members, req.user.id],
      createdBy: req.user.id,
    });

    const group = await newGroup.save();
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/groups
// @desc    Get all groups for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
