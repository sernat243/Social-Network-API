const User = require('../models/userModel');
const Thought = require('../models/thoughtModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate({
        path: 'friends',
        select: 'username', // Populate only the username field of friends
      })
      .populate({
        path: 'thoughts',
        select: 'thoughtText', // Populate only the thoughtText field of thoughts
      });

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .populate({
        path: 'friends',
        select: 'username', // Populate only the username field of friends
      })
      .populate({
        path: 'thoughts',
        select: 'thoughtText', // Populate only the thoughtText field of thoughts
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndRemove(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const thought = await Thought.create(req.body);

    // Add the thought's ObjectId to the user's "thoughts" array
    user.thoughts.push(thought._id);
    await user.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Check if the friend is not already in the user's friends list
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Friend already in the user\'s friend list' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the friend is in the user's friends list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Friend not found in the user\'s friend list' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createThought,
  addFriend,
  removeFriend,
};