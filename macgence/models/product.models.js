const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
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
  type: {
    type: String,
  },
  language: {
    type: String,
  },
  languageTitle: {
    type: String,
  },
  Country: {
    type: String,
  },
  Dilacts: {
    type: String,
  },
  Genderdistribution: {
    type: String,
  },
  AgeGroups: {
    type: String,
  },
  Enviorment: {
    type: String,
  },
  BitDepth: {
    type: String,
  },
  SampleRate: {
    type: String,
  },
  Channel: {
    type: String,
  },
  AudioFileDuration: {
    type: String,
  },
  Demographic: {
    type: String,
  },
  Countries: {
    type: String,
  },
  Format: {
    type: String,
  },
  Resolution: {
    type: String,
  },
  Annotation: {
    type: String,
  },
  DatasetType: {
    type: String,
  },
  Volume: {
    type: String,
  },
  MediaType: {
    type: String,
  },
  LanguagePain: {
    type: String,
  },
  Type: {
    type: String,
  },
  WordCount: {
    type: String,
  },
  status:{ type: String,enum:["Active","Inactive"],default:"Active"},
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
