const express = require("express");
//const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

//app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});

const db = require("./models");

require("./routes/api")(app, path, db);
require("./routes/html")(app, path, db);

app.listen(PORT, () => {
    console.log("----------------------");
    console.log("App listening on PORT " + PORT);
  });