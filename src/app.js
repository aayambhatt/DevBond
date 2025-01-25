// Importing the express module
const express = require("express");

// Creating an instance of the express application
const app = express();

app.get(
  "/user",
  (req, res, next) => {
    //Route handler
    // res.send("Route handler 1");
    next();
  },
  (req, res, next) => {
    // res.send("Route handler 2");
    next();
  },
  (req, res, next) => {
    // res.send("Route handler 3");
    next();
  },
  (req, res,next) => {
    // res.send("Route handler 4");
    next();
  }
);

app.listen(2626, () => {
  console.log("Server is succeful on port 2626");
});
