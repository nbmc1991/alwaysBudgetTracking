const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

<<<<<<< HEAD
const PORT = process.env.PORT || 3001;
=======
const PORT = 7777;
>>>>>>> aa78fa1981c9cc0ccc4bf49d893999d450adab6d

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});