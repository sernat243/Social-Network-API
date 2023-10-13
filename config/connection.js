const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialNetworkDB');

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;