const mongoose = require('mongoose');

const subSubCategorySchema = new mongoose.Schema({
  Category:{type:Array},
  subCategory:{type:String},
  title: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const subSubCategory = mongoose.model('subsubcategory', subSubCategorySchema);

module.exports = subSubCategory;