const mongoose = require("mongoose");

const hauntSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true, ref: "User" },
});

module.exports = mongoose.model("Haunt", hauntSchema);
