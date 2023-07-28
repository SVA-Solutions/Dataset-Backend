const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const User = mongoose.model('category', categorySchema);

module.exports = User;