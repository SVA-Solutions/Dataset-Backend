const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  shortDescription: {
    type: String,

  },
  description: {
    type: String,

  },
  uses: {
    type: Array,

  },
  image: {
    type: String,

  },
  TotalVolume: {
    type: String,

  },
  Numberofparticipants: {
    type: String,

  },
  category: {
    type: String,

  },
  subcategory: {
    type: String,

  },
  subsubcategory: {
    type: String,

  },
  categorybyproduct: {
    type: String,

  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
