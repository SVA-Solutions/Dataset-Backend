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
    Product: require("../macgence/models/product.models"),
    User: require("../macgence/models/user.model"),
    Category: require("../macgence/models/category.models"),
    subCategory: require("../macgence/models/subcategory.models"),
    subsubCategory: require("../macgence/models/subsubcategory.models"),
    Categorybyproduct: require("../macgence/models/categorybyProduct.models"),
    Dataset: require("../macgence/models/dataset.models"),
    Banner: require("../macgence/models/banner.models"),
    Email:require("../macgence/models/email.models")
    

};