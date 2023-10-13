const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');

// Route for getting all thoughts
router.get('/', thoughtController.getThoughts);

// Route for getting a single thought by _id
router.get('/:id', thoughtController.getThoughtById);

// Route for creating a new thought
router.post('/', thoughtController.createThought);

// Route for updating a thought by _id
router.put('/:id', thoughtController.updateThought);

// Route for deleting a thought by _id
router.delete('/:id', thoughtController.deleteThought);

// Route for creating a reaction stored in a single thought's reactions array
router.post('/:thoughtId/reactions', thoughtController.createReaction);

// Route for pulling and removing a reaction by reactionId value
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;