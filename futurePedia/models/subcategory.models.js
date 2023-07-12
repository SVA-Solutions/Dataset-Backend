const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  category:{ type: Array},
  image:{ type: String},
  title: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const subCategory = mongoose.model('subcategory', subcategorySchema);

module.exports = subCategory;