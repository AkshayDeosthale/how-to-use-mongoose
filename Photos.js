const mongoose = require("mongoose");

const photosSchema = new mongoose.Schema({
  id: String,
  created_at: String,
  width: Number,
  height: Number,
  url: {
    raw: String,
    full: String,
    regular: String,
    small: String,
  },
  download: String,
  lastName: String,
  twitter: String,
  bio: String,
  location: String,
});

module.exports = mongoose.model("Photo", photosSchema);
