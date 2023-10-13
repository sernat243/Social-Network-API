const Thought = require('../models/thoughtModel');

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const thought = await Thought.findById(thoughtId);
  
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
  
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedThought = await Thought.findByIdAndRemove(id);
    
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    
    res.json(deletedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const removeReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
};