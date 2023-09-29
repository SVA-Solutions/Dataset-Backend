const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  title:{type:String},
  description:{type:String},
  image:{type:String},
  state:{ type: String,enum:["Active","Inactive"],default:"Active"},
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Banner = mongoose.model('Banner', datasetSchema);

module.exports = Banner;
