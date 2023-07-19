const mongoose = require('mongoose');

const config = require('../config.json');

try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set("strictQuery", false);
    mongoose.connect(config.connectionString, options)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.log('MongoDB connection error: ', err);
    });
        
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
module.exports = {
    Product: require("../futurePedia/models/product.models"),
    Category: require("../futurePedia/models/category.models"),
    subCategory: require("../futurePedia/models/subcategory.models"),
    subsubCategory: require("../futurePedia/models/subsubcategory.models"),
    Categorybyproduct: require("../futurePedia/models/categorybyProduct.models"),
    Dataset: require("../futurePedia/models/dataset.models"),
    

};