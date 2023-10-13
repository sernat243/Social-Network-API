const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const port = process.env.PORT || 3001;

// middleware for parsing incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err); // Log the error to the console
  res.status(500).json({ message: 'Internal Server Error' }); // Respond with a 500 Internal Server Error
});

db.once('open', () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
    });
  });

