const db = require("../../_helpers/db");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = db.User
const product = db.Product
const news = db.News
const category = db.Category
const subcategory = db.subCategory
const subsubcategory = db.subsubCategory
const categorybyProduct = db.Categorybyproduct
const dataset = db.Dataset
const feature = db.Feature
const pricing = db.Pricing
const blog = db.Blog
const banner = db.Banner
const Email = db.Email

module.exports = {


  productList,
  addproduct,
  productById,
  productUpdate,
  productStatusUpdate,
  productDelete,
  productByIdforupdate,

  categoryList,
  addcategoryList,
  addcategory,
  categoryById,
  categoryUpdate,
  categoryDelete,

  subcategoryList,
  subcategoryListbid,
  addsubcategoryList,
  addsubcategory,
  subcategoryById,
  subcategoryUpdate,
  subcategoryDelete,

  subsubcategoryList,
  addsubsubcategoryList,
  addsubsubcategory,
  subsubcategoryById,
  subsubcategoryUpdate,
  subsubcategoryDelete,

  categorybyproductList,
  addcategorybyproduct,
  categorybyproductById,
  categorybyproductUpdate,
  categorybyproductDelete,

  datasetList,
  adddataset,
  datasetById,
  datasetUpdate,
  datasetDelete,

  userList,
  addUser,
  userById,
  userUpdate,
  userDelete,
  getById,

  bannerDelete,
  bannerUpdate,
  bannerById,
  addBanner,
  bannerList,

  email

}





// -------Product------------

//  productList 
async function productList(req, res) {
  const list = []
  const data = await product.find({status:"Active"}).sort({ _id: -1 });
  console.log("data", data)
  for (let i = 0; data.length > i; ++i) {

    const Category = await category.findOne({ _id: data[i]?.category })
    const subCategory = await subcategory.findOne({ _id: data[i]?.subcategory })
    const subsubCategory = await subsubcategory.findOne({ _id: data[i]?.subsubcategory })

    console.log("Category", Category)
    console.log("subCategory", subCategory)
    console.log("subsubCategory", subsubCategory)
    list.push({
      id: data[i]?._id,
      title: data[i]?.title,
      type: data[i]?.type,
      category: Category?.title,
      subcategory: subCategory?.title,
      subsubcategory: subsubCategory?.title,
      status: data[i]?.status,
    })
  }
  return res.status(200).json({
    data: list,
    message: "success",
    status: "1",
  });
}


// // Add product
// async function addproduct(req, res) {
//   var files = req.files;
//   if (typeof files.image != "undefined") {
//     var images = "";
//     for (var j = 0; j < files.image.length; j++) {
//       var image_name = files.image[j].filename;
//       images += image_name + ",";
//       var image = images.replace(/,\s*$/, "");
//     }
//   } else {
//     var image = req.body.dataset;
//   }
//   if (req.body.type == "Image") {
//     var productData = new product({
//       title: req.body.title,
//       slug: req.body.title.replace(/ /g, "_"),
//       shortDescription: req.body.shortDescription,
//       description: req.body.description,
//       uses: req.body.uses,
//       metaTitle: req.body.metatitle,
//       metadescription: req.body.metadescription,
//       category: req.body.category,
//       subcategory: req.body.subcategory,
//       subsubcategory: req.body.subsubcategory,
//       TotalVolume: req.body.TotalVolume,
//       categorybyproduct: req.body.categorybyproduct,
//       Demographic: req.body.Demographic,
//       Countries: req.body.Countries,
//       Volume: req.body.Volume,
//       AgeGroups: req.body.AgeGroups,
//       Enviorment: req.body.Enviorment,
//       Format: req.body.Format,
//       Resolution: req.body.Resolution,
//       Annotation: req.body.Annotation,
//       type: req.body.type,
//       languageTitle: req.body.languageTitle,
//       image: image,
//     })
//   }
//   else if (req.body.type == "Audio") {
//     var productData = new product({
//       title: req.body.title,
//       slug: req.body.title.replace(/ /g, "_"),
//       shortDescription: req.body.shortDescription,
//       description: req.body.description,
//       uses: req.body.uses,
//       category: req.body.category,
//       subcategory: req.body.subcategory,
//       subsubcategory: req.body.subsubcategory,
//       metaTitle: req.body.metatitle,
//       metadescription: req.body.metadescription,
//       TotalVolume: req.body.TotalVolume,
//       categorybyproduct: req.body.categorybyproduct,
//       language: req.body.language,
//       Country: req.body.Country,
//       Dilacts: req.body.Dilacts,
//       Genderdistribution: req.body.Genderdistribution,
//       AgeGroups: req.body.AgeGroups,
//       Enviorment: req.body.Enviorment,
//       BitDepth: req.body.BitDepth,
//       Format: req.body.Format,
//       SampleRate: req.body.SampleRate,
//       Channel: req.body.Channel,
//       AudioFileDuration: req.body.AudioFileDuration,
//       type: req.body.type,
//       languageTitle: req.body.languageTitle,
//       image: image,
//     })
//   }
//   else if (req.body.type == "Text") {
//     var productData = new product({
//       title: req.body.title,
//       slug: req.body.title.replace(/ /g, "_"),
//       shortDescription: req.body.shortDescription,
//       description: req.body.description,
//       uses: req.body.uses,
//       category: req.body.category,
//       subcategory: req.body.subcategory,
//       metaTitle: req.body.metatitle,
//       metadescription: req.body.metadescription,
//       subsubcategory: req.body.subsubcategory,
//       TotalVolume: req.body.TotalVolume,
//       categorybyproduct: req.body.categorybyproduct,
//       DatasetType: req.body.DatasetType,
//       Volume: req.body.Volume,
//       MediaType: req.body.MediaType,
//       LanguagePain: req.body.LanguagePain,
//       Type: req.body.Type,
//       WordCount: req.body.WordCount,
//       Format: req.body.Format,
//       Annotation: req.body.Annotation,
//       type: req.body.type,
//       languageTitle: req.body.languageTitle,
//       image: image,
//     })
//   }

//   db.Product.create(productData, async function (err, result) {
//     if (result) {
//       return res.status(200).json({
//         message: "successfully product add",
//         status: "1",
//       });
//     } else {
//       console.log("err", err)
//       res.status(200).json({
//         message: "error in adding product ",
//         status: "0",
//       });
//     }
//   });
// }

async function addproduct  (req, res)  {
  try {
    const { title, shortDescription,metaTitle,metadescription, description, uses, category, subcategory, subsubcategory, TotalVolume, categorybyproduct, type, languageTitle } = req.body;
    let image = "";

    if (req.files && req.files.image) {
      image = req.files.image.map(file => file.filename).join(",");
    } else if (type === "Text") {
      image = req.body.dataset;
    }

    let productData = {
      title,
      slug: title.replace(/ /g, "_"),
      shortDescription,
      description,
      uses,
      category,
      subcategory,
      subsubcategory,
      TotalVolume,
      categorybyproduct,
      type,
      image,
      metadescription,
      metaTitle
    };

    if (type === "Image") {
      productData = {
        ...productData,
        Demographic: req.body.Demographic,
      Countries: req.body.Countries,
      Volume: req.body.Volume,
      AgeGroups: req.body.AgeGroups,
      Enviorment: req.body.Enviorment,
      Format: req.body.Format,
      Resolution: req.body.Resolution,
      Annotation: req.body.Annotation,
      languageTitle: req.body.languageTitle
      };
    } else if (type === "Audio") {
      productData = {
        ...productData,
        language: req.body.language,
      Country: req.body.Country,
      Dilacts: req.body.Dilacts,
      Genderdistribution: req.body.Genderdistribution,
      AgeGroups: req.body.AgeGroups,
      Enviorment: req.body.Enviorment,
      BitDepth: req.body.BitDepth,
      Format: req.body.Format,
      SampleRate: req.body.SampleRate,
      Channel: req.body.Channel,
      AudioFileDuration: req.body.AudioFileDuration,
      languageTitle: req.body.languageTitle,
      };
    } else if (type === "Text") {
      productData = {
        ...productData,
        DatasetType: req.body.DatasetType,
        Volume: req.body.Volume,
        MediaType: req.body.MediaType,
        LanguagePain: req.body.LanguagePain,
        Type: req.body.Type,
        WordCount: req.body.WordCount,
        Format: req.body.Format,
        Annotation: req.body.Annotation,
  
        languageTitle: req.body.languageTitle,
      };
    }

    const result = await db.Product.create(productData);

    if (result) {
      return res.status(200).json({
        message: "Successfully added product",
        status: "1",
      });
    } else {
      throw new Error("Failed to add product");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error in adding product",
      status: "0",
    });
  }
};


async function productByIdforupdate(req, res) {

  const data = await product.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data
  })
}
// product by id
async function productById(req, res) {
  console.log("productById", req.body)

  const data = await product.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,

    messgae: "success",
    status: "1"
  })
}

// product Update
async function productUpdate(req, res) {
  var files = req.files;
  if (files.image == "") {
    return res.status(200).json({
      message: "file require"
    })
  }
  if (req.body.category == "") {
    return res.status(200).json({
      message: "sellect category"
    })
  }
  if (req.body.subcategory == "") {
    return res.status(200).json({
      message: "sellect subcategory"
    })
  }
  if (req.body.susubcategory == "") {
    return res.status(200).json({
      message: "sellect susubcategory"
    })
  }
  if (req.body.categorybyproduct == "") {
    return res.status(200).json({
      message: "sellect categorybyproduct"
    })
  }
  console.log("productUpdatetyrtyertyert", req.body)

  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }
  console.log("image", image)
  if (req.body.type == "Image") {
    var productData = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      uses: req.body.uses,
      category: req.body.category,
      subcategory: req.body.subcategory,
      subsubcategory: req.body.subsubcategory,
      TotalVolume: req.body.TotalVolume,
      categorybyproduct: req.body.categorybyproduct,
      Demographic: req.body.Demographic,
      Countries: req.body.Countries,
      Volume: req.body.Volume,
      AgeGroups: req.body.AgeGroups,
      Enviorment: req.body.Enviorment,
      Format: req.body.Format,
      Resolution: req.body.Resolution,
      Annotation: req.body.Annotation,
      type: req.body.type,
      languageTitle: req.body.languageTitle,
      image: image,
    }
  }
  else if (req.body.type == "Audio") {
    var productData = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      uses: req.body.uses,
      category: req.body.category,
      subcategory: req.body.subcategory,
      subsubcategory: req.body.subsubcategory,
      TotalVolume: req.body.TotalVolume,
      categorybyproduct: req.body.categorybyproduct,
      language: req.body.language,
      Country: req.body.Country,
      Dilacts: req.body.Dilacts,
      Genderdistribution: req.body.Genderdistribution,
      AgeGroups: req.body.AgeGroups,
      Enviorment: req.body.Enviorment,
      BitDepth: req.body.BitDepth,
      Format: req.body.Format,
      SampleRate: req.body.SampleRate,
      Channel: req.body.Channel,
      AudioFileDuration: req.body.AudioFileDuration,
      type: req.body.type,
      languageTitle: req.body.languageTitle,
      image: image,
    }
  }
  else if (req.body.type == "Text") {
    var productData = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      uses: req.body.uses,
      category: req.body.category,
      subcategory: req.body.subcategory,
      subsubcategory: req.body.subsubcategory,
      TotalVolume: req.body.TotalVolume,
      categorybyproduct: req.body.categorybyproduct,
      DatasetType: req.body.DatasetType,
      Volume: req.body.Volume,
      MediaType: req.body.MediaType,
      LanguagePain: req.body.LanguagePain,
      Type: req.body.Type,
      WordCount: req.body.WordCount,
      Format: req.body.Format,
      Annotation: req.body.Annotation,
      type: req.body.type,
      languageTitle: req.body.languageTitle,
      image: image,
    }
  }
  console.log("productData1234566789", productData)
  await product.updateOne({ _id: req.body.id },
    productData
    , function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// productStatusUpdate
async function productStatusUpdate(req, res) {
  console.log("productStatusUpdate", req.body)

  await db.Product.updateOne({ _id: req.body.id },
    {
      verified: "verifieds",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "successfully",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}
// productStatusUpdate
async function productDelete(req, res) {
  console.log("productDelete", req.body)

  await db.Product.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "successfully product deleted",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------Category------------

//  CategoryList 
async function categoryList(req, res) {
  console.log("categoryList", req.body)

  const data = await category.find({ status: "Active" }).sort({ _id: -1 });
  var list = []
  for (let i = 0; data.length > i; ++i) {
    var productlength = await product.find({ category: data[i].id })
    list.push({
      title: data[i].title,
      id: data[i]._id,
      subCategory: data[i].subCategory,
      image: data[i].image
    })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}

// Add Category
async function addcategory(req, res) {
  console.log("addcategoryyyyy", req.body)

  const categoryData = new category({
    title: req.body.title,
  });

  db.Category.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "successfully category added",
        status: "1",
      });
    } else {
      console.log("err", err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}
async function addcategoryList(req, res) {
  console.log("addcategoryList", req.body)
  const list = []


  const Category = await category.find({ status: "Active" }).sort({ _id: -1 });

  return res.status(200).json({
    Category: Category,
    messgae: "success",
    status: "1"
  })
}
// category by id
async function categoryById(req, res) {
  console.log("categoryById", req.body)

  const data = await category.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// category Update
async function categoryUpdate(req, res) {
  console.log("categoryUpdate", req.body)


  await category.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// category Delete
async function categoryDelete(req, res) {
  console.log("categoryDelete", req.body)

  await db.Category.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------subCategory------------

//  subCategoryList 
async function subcategoryList(req, res) {
  console.log("categoryList", req.body)

  const data = await subcategory.find({ status: "Active" }).sort({ _id: -1 });
  var list = []
  for (let i = 0; data.length > i; ++i) {
    var categorydetail = await db.Category.find({ _id: data[i].category })
    list.push({
      title: data[i].title,
      id:data[i]._id,
      category: categorydetail.map((e)=>{return( {id:e._id,name:e.title})}),
      subCategorytitle: categorydetail.title,
      subCategory: data[i].subCategory,
      image: data[i].image
    })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}
//  subCategoryListbysubcat 
async function subcategoryListbid(req, res) {
  console.log("subcategoryListbid", req.body)

  const data = await subcategory.find({ status: "Active", category: { $in: req.body.id } }).sort({ _id: -1 });
  var list = []
  for (let i = 0; data.length > i; ++i) {
    var categorydetail = await db.Category.find({ _id: data[i].subCategory })
    list.push({
      title: data[i].title,
      id: data[i]._id,
      subCategorytitle: categorydetail.title,
      subCategory: data[i].subCategory,
      image: data[i].image
    })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}
// Add subCategory
async function addsubcategory(req, res) {
  console.log("addsubcategoryyyyy", req.body)
  var files = req.files;
  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  const categoryData = new subcategory({
    title: req.body.title,
    category: req.body.category,
    image: image
  });

  db.subCategory.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err", err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}
async function addsubcategoryList(req, res) {
  const CategoryList = await subcategory.find({ category: req.body.id })
  const categorybyProductlist = await categorybyProduct.find({ Category: { $in: req.body.id }, status:"Active" })
  console.log("Category", CategoryList)
  return res.status(200).json({
    Category: CategoryList,
    categorybyProductlist: categorybyProductlist,
    messgae: "success",
    status: "1"
  })
}
// subCategory by id
async function subcategoryById(req, res) {
  console.log("subcategoryById", req.body)

  const data = await subcategory.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// subCategory Update
async function subcategoryUpdate(req, res) {
  console.log("categoryUpdate", req.body)


  await subcategory.updateOne({ _id: req.body.id },
    {
      title: req.body.title,

    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// subCategory Delete
async function subcategoryDelete(req, res) {
  console.log("categoryDelete", req.body)

  await db.subCategory.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------subsubCategory------------

//  subsubCategoryList 
async function subsubcategoryList(req, res) {
  console.log("subsubcategoryList", req.body)

  const data = await subsubcategory.find({ status: "Active" }).sort({ _id: -1 });
  var list = []

  for (let i = 0; data.length > i; ++i) {
 
    var categorydetail = await db.Category.find({ _id: data[i].Category })
    var productlength = await product.find({ category: data[i].id })
    list.push({
      title: data[i].title,
      id:data[i]._id,
      category: categorydetail.map((e)=>{return( {id:e._id,name:e.title})}),
      subCategory: data[i].subCategory,
      image: data[i].image,
      
    })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}

// Add subsubCategory
async function addsubsubcategory(req, res) {
  console.log("addcategoryyyyy", req.body)


  const categoryData = new subsubcategory({
    title: req.body.title,
    subCategory: req.body.subCategory,
    Category: req.body.Category
  });

  db.subsubCategory.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err", err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}
async function addsubsubcategoryList(req, res) {
  console.log("addcategoryList", req.body)
  const list = []


  const Category = await subsubcategory.find({ subCategory: req.body.id ,status:"Active" })

  return res.status(200).json({
    Category: Category,
    messgae: "success",
    status: "1"
  })
}
// subsubCategory by id
async function subsubcategoryById(req, res) {
  console.log("categoryById", req.body)

  const data = await subsubcategory.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// subsubCategory Update
async function subsubcategoryUpdate(req, res) {
  console.log("categoryUpdate", req.body)


  await subsubcategory.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// subsubCategory Delete
async function subsubcategoryDelete(req, res) {
  console.log("categoryDelete", req.body)

  await db.subsubCategory.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------categorybyproduct------------

//  categorybyproductList 
async function categorybyproductList(req, res) {
  console.log("categoryList", req.body)

  const data = await categorybyProduct.find({ status: "Active" }).sort({ _id: -1 });
  var list = []
  for (let i = 0; data.length > i; ++i) {
    var categorydetail = await db.Category.find({ _id: data[i].Category , status:"Active" })
    var productlength = await product.find({ category: data[i].id })
    list.push({
      title: data[i].title,
      id:data[i]._id,
      subCategory: categorydetail.map((e)=>{return( {id:e._id,name:e.title})}),
     
    })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}

// Add categorybyproduct
async function addcategorybyproduct(req, res) {
  console.log("addcategoryyyyy", req.body)


  const categoryData = new categorybyProduct({
    title: req.body.title,
    Category: req.body.Category,
    subCategory: req.body.subcategory,
  });

  db.Categorybyproduct.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err", err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// categorybyproduct by id
async function categorybyproductById(req, res) {
  console.log("categoryById", req.body)

  const data = await categorybyProduct.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// categorybyproduct Update
async function categorybyproductUpdate(req, res) {
  console.log("categoryUpdate", req.body)


  await categorybyProduct.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// categorybyproduct Delete
async function categorybyproductDelete(req, res) {
  console.log("categoryDelete", req.body)

  await db.Categorybyproduct.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------dataset------------

//  datasetList 
async function datasetList(req, res) {
  console.log("datasetList", req.body)

  const data = await db.Dataset.find({ state: "Active" }).sort({ _id: -1 });
  var list = []
  for (let i = 0; data.length > i; ++i) {
    const Product = await db.Product.findOne({ _id: data[i].productId })
    console.log("Product", data[i].productId)
    list.push({
      productname: Product?.title,
      type: Product?.type,
      id: data[i]._id,
    })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}

// Add dataset
async function adddataset(req, res) {

  var files = req.files;
  if (typeof files != "undefined") {
    if (typeof files.image != "undefined") {
      var images = "";
      for (var j = 0; j < files.image.length; j++) {
        var image_name = files.image[j].filename;
        images += image_name + ",";
        var image = images.replace(/,\s*$/, "");
      }
    }
  }
  if (req.body.type == "Image") {
    var datasetData = new db.Dataset({
      productId: req.body.productId,
      Age: req.body.age,
      Gender: req.body.gender,
      Annotation: req.body.Annotation,
      image: image
    });
  }
  else if (req.body.type == "Text") {
    var datasetData = new db.Dataset({
      productId: req.body.productId,
      English: req.body.English,
      Language: req.body.Language,
    });
  }
  else if (req.body.type == "Audio") {
    var datasetData = new db.Dataset({
      productId: req.body.productId,
      channel1: req.body.channel1,
      channel2: req.body.channel2,
      Format: req.body.Format,
      image: image
    });
  }

  db.Dataset.create(datasetData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err", err)
      return res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// dataset by id
async function datasetById(req, res) {
  console.log("datasetById", req.body);

  try {
    const data = await db.Dataset.findOne({ _id: req.body.id });

    if (!data) {
      return res.status(404).json({
        message: "Dataset not found",
        status: "0"
      });
    }

    const Product = await db.Product.findOne({ _id: data.productId });

    if (!Product) {
      return res.status(404).json({
        message: "Product not found",
        status: "0"
      });
    }

    // Extract relevant properties from the MongoDB document
    const { Format, channel1, channel2, createdAt, image, state, updatedAt ,productId  } = data._doc;

    const newData = {
      Format,
      channel1,
      channel2,
      createdAt,
      image,
      state,
      updatedAt,
      productId,
      id:Product.id,
      type: Product?.type
    };

    return res.status(200).json({
      data: newData,
      message: "success",
      status: "1"
    });
  } catch (error) {
    console.error("Error in datasetById:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: "0"
    });
  }
}


// dataset Update
async function datasetUpdate(req, res) {
  console.log("datasetUpdatedfadfas", req.body);
  var files = req.files;

  try {
    let updateData = {};

    if (typeof files !== "undefined" && typeof files.image !== "undefined") {
      let images = "";
      for (let j = 0; j < files.image.length; j++) {
        const image_name = files.image[j].filename;
        images += image_name + ",";
      }
      updateData.image = images.replace(/,\s*$/, "");
    } else {
      updateData.image = req.body.image;
    }

    updateData.productId = req.body.productId;

    if (req.body.type === "Image") {
      updateData.Age = req.body.age;
      updateData.Gender = req.body.gender;
      updateData.Annotation = req.body.Annotation;
    } else if (req.body.type === "Text") {
      updateData.English = req.body.English;
      updateData.Language = req.body.Language;
    } else if (req.body.type === "Audio") {
      updateData.channel1 = req.body.channel1;
      updateData.channel2 = req.body.channel2;
      updateData.Format = req.body.Format;
    }

   const result = await db.Dataset.updateOne({ _id: req.body.id }, updateData);

    console.log("result",result)
    if (result.nModified > 0) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      return res.status(200).json({
        message: "Error",
        status: "0",
      });
    }
  } catch (error) {
    console.error("Error in datasetUpdate:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: "0",
    });
  }
}


// dataset Delete
async function datasetDelete(req, res) {
  console.log("datasetDelete", req.body)

  await db.Dataset.updateOne({ _id: req.body.id },
    {
      state: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------USER------------

//  user list
async function userList(req, res) {
  console.log("userList", req.body)

  const data = await user.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

//getbyid
async function getById(id) {
  return await user.findById(id);
}

// Add user
async function addUser(req, res) {
  console.log("addUser", req.body)

  if (await user.findOne({ email: req.body.email })) {
    return res.status(200).json({
      message: "Email " + req.body.email + " is already taken",
      status: "0",
    });
  }

  const Userdata = new user({
    full_name: req.body.full_name,
    email: req.body.email.toLowerCase()
  });

  const Users = new user(Userdata);
  // hash password
  if (req.body.password) {
    Users.password = bcrypt.hashSync(req.body.password, 10);
  }
  //   JWT token
  const payload = {
    full_name: req.body.full_name,
    email: req.body.email.toLowerCase()
  }
  const token = jwt.sign(payload, config.secret, {
    expiresIn: "365d",
  });
  console.log("token", token)
  Users.token = token
  // save user
  await Users.save();

  return res.status(200).json({
    messgae: "success",
    status: "1"
  })
}

// user by id
async function userById(req, res) {
  console.log("UserById", req.body)

  const data = await user.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// user Update
async function userUpdate(req, res) {
  console.log("userUpdate", req.body)

  await user.updateOne({ _id: req.body.id },
    {
      full_name: req.body.full_name,
      email: req.body.email.toLowerCase(),
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// user Delete
async function userDelete(req, res) {
  console.log("userDelete", req.body)

  await db.User.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
      deleted_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------Banner------------

//  banner list
async function bannerList(req, res) {
  console.log("userList", req.body)
  if (__dirname == "/macgence/backend/macgence/controllers") {
    var PicUrl = `${process.env.URL}/uploads/banner/`;
  } else {
    var PicUrl =
      "https://" + "dataapi.macgence.com" + "/uploads/banner/";

  }
  const data = await banner.find({ state: "Active" }).sort({ _id: -1 });
  var array = []
  for (let i = 0; data.length > i; i++) {
    array.push({
      title: data[i].title,
      description: data[i].description,
      id: data[i]._id,
      image: PicUrl + data[i].image
    })
  }

  return res.status(200).json({
    data: array,
    messgae: "success",
    status: "1"
  })
}

// Add banner
async function addBanner(req, res) {
  console.log("addBanner", req.body)
  var files = req.files;
  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.dataset;
  }

  const Bannerdata = new banner({
    title: req.body.title,
    description:req.body.description,
    image: image
  });

  db.Banner.create(Bannerdata, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "successfully Banner Added",
        status: "1",
      });
    } else {
      console.log("err", err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// banner by id
async function bannerById(req, res) {
  console.log("bannerById", req.body)

  const data = await banner.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Banner Update
async function bannerUpdate(req, res) {
  console.log("bannerUpdate", req.body)
  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.dataset;
  }
  await banner.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      description:req.body.description,
      image: image,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// banner Delete
async function bannerDelete(req, res) {
  console.log("bannerDelete", req.body)

  await db.Banner.updateOne({ _id: req.body.id },
    {
      state: "Inactive",
      deleted_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "Successfully deleted Banner",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


async function email(req, res) {
  console.log("categoryList", req.body)

  const data = await Email.find({ status: "Active" }).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}


