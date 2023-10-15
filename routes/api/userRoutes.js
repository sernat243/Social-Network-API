const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Route for getting all users
router.get('/', userController.getUsers);

// Route for getting a single user by _id and populating friend data
router.get('/:id', userController.getUserById);

// Route for creating a new user
router.post('/', userController.createUser);

// Route for updating a user by _id
router.put('/:id', userController.updateUser);

// Route for deleting a user by _id
router.delete('/:id', userController.deleteUser);

// Route for creating a new thought for a user
router.post('/:userId/thoughts', userController.createThought);

// Route for adding a new friend to a user's friend list
router.post('/:userId/friends/:friendId', userController.addFriend);

// Route for removing a friend by their ID
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;