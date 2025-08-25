const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// @route   GET api/messages/:userId
// @desc    Get chat history with a user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { from: req.user.id, to: req.params.userId },
        { from: req.params.userId, to: req.user.id },
      ],
    }).sort({ createdAt: 'asc' });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/messages/group/:groupId
// @desc    Get chat history for a group
// @access  Private
router.get('/group/:groupId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      group: req.params.groupId,
    }).sort({ createdAt: 'asc' });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
