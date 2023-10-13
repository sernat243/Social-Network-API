const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Route for getting all users
router.get('/', userController.getUsers);

// Route for getting a single user by _id and populating thought and friend data
router.get('/:id', userController.getUserById);

// Route for creating a new user
router.post('/', userController.createUser);

// Route for updating a user by _id
router.put('/:id', userController.updateUser);

// Route for deleting a user by _id
router.delete('/:id', userController.deleteUser);

// Bonus: Remove a user's associated thoughts when deleted
//router.delete('/:userId/thoughts/:thoughtId', userController.removeUserThought);

module.exports = router;