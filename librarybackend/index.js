const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Book = require("./db/Book");
const app = express();

const Jwt = require("jsonwebtoken");
const jwtKey = "librarybackend";

app.use(express.json());
app.use(cors());

// Registration API
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, (err, token) => {
    if (err) {
      resp.send({
        result: "Something Went Wrong, Please try after some time.",
      });
    }
    resp.send({ result, auth: token });
  });
  resp.send(result);
});

// LOGIN API
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send({
            result: "Something Went Wrong, Please try after some time.",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No! user found" });
    }
  } else {
    resp.send({ result: "No! User found" });
  }
});

// Add-Book API
app.post("/books", async (req, resp) => {
  let book = new Book(req.body);
  let result = await book.save();
  resp.send(result);
});

// Fetch-Book API
app.get("/books", async (req, resp) => {
  let books = await Book.find();
  if (books.length > 0) {
    resp.send(books);
  } else {
    resp.send({ result: "No! Books found" });
  }
});

// Delete-Book API
app.delete("/book/delete/:id", async (req, resp) => {
  const result = await Book.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// Get Specific Book API
app.get("/book/:id", async (req, resp) => {
  let result = await Book.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No! Books found" });
  }
});

// Update-Book API
app.put("/book/:id", async (req, resp) => {
  let result = await Book.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

// Search-Book API
app.get("/search/:key", async (req, resp) => {
  let result = await Book.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

// Fetch the book which is created 10 min before
app.get("/books/old", async (req, resp) => {
  var dateq = new Date();
  let result = await Book.find({
    updatedAt: { $not: { $gt: new Date(dateq.getTime() - 10 * 60 * 1000) } },
  });
  resp.send(result);
});

// Fetch the book which is created within 10 min
app.get("/books/new", async (req, resp) => {
  var dateq = new Date();
  let result = await Book.find({
    updatedAt: { $gt: new Date(dateq.getTime() - 10 * 60 * 1000) },
  });
  resp.send(result);
});

app.listen(4500);
