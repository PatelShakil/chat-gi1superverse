const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const auth = require('../middleware/auth');

// @route   POST api/stories
// @desc    Create a new story
// @access  Private
router.post('/', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const newStory = new Story({
      content,
      user: req.user.id,
    });

    const story = await newStory.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/stories
// @desc    Get all stories for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const stories = await Story.find().populate('user', ['username', 'profilePic']);
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/stories/:id/view
// @desc    View a story
// @access  Private
router.put('/:id/view', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    if (!story.viewers.includes(req.user.id)) {
      story.viewers.push(req.user.id);
      await story.save();
    }

    res.json(story.viewers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;