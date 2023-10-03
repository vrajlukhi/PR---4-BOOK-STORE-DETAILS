const mongoose = require("mongoose")

const bookschema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publicationYear: Number,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String
}, { timestamps: true })

let book = mongoose.model("book", bookschema)

module.exports = book