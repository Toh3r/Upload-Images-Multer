// Import libraries/frameworks
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Get routes
const indexRoutes = require("./routes/index");

// Some server config
const app = express();
const port = process.env.port || 3000; // If running locally use 3000 else use whatever is assigned by host
const publicPath = path.join(__dirname, "/public");

// Frontend config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static(publicPath));

// Create db url
const dbUrl =
  process.env.DATABASEURL || "mongodb://localhost/Testdb";

  // Connect to db
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    console.log(`Connected to db on ${dbUrl}`);
  }
);

// Use Routes
app.use("/", indexRoutes);

// Start server on port...
app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
