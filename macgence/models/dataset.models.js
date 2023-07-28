const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  productId:{type:String},
  Age:{type:String},
  Gender:{type:String},
  Annotation:{type:String},
  English:{type:String},
  Language:{type:String},
  channel1:{type:String},
  channel2:{type:String},
  Format:{type:String},
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

const dataset = mongoose.model('dataset', datasetSchema);

module.exports = dataset;
