require("dotenv").config();
const express = require("express");
const app = express();
require('express-async-errors')
const db = require("./utils/db");
const blogRoute = require("./controllers/blogs");

app.use(express.json());

// Initialize database connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Include routes
app.use(blogRoute);

// Error handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});