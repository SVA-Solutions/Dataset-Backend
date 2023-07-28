const mongoose = require('mongoose');

const categorybyproductSchema = new mongoose.Schema({
  Category:{type: Array},
  state:{ type: String,enum:["Active","Inactive"],default:"Active"},
  title: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

const Categorybyproduct = mongoose.model('categorybyproduct', categorybyproductSchema);

module.exports = Categorybyproduct;