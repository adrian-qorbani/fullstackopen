require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const routes = require("./routes");

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
app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});