const express = require("express");
const dbConfig = require("./database.config");
const mongoose = require("mongoose");
const port =7000
mongoose.Promise = global.Promise;
const cors = require('cors');

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// create express app
const app = express();
app.use(cors()); // Enable CORS for all origins

app.use(express.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// listen for requests
require("./routers/note.routes")(app);
require("./routers/car.routes")(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
