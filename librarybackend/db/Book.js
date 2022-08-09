const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    category: { type: String },
    price: { type: Number },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", bookSchema);
