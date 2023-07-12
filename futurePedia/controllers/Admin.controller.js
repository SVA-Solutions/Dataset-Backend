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
const feature = db.Feature
const pricing = db.Pricing
const blog = db.Blog
const comment = db.Comment

module.exports = {


  productList,
  addproduct,
  productById,
  productUpdate,
  productStatusUpdate,

  categoryList,
  addcategoryList,
  addcategory,
  categoryById,
  categoryUpdate,
  categoryDelete,

  subcategoryList,
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

}





// -------Product------------

//  productList 
async function productList(req, res) {
  const list = []
  const data = await product.find({}).sort({ _id: -1 });

  for(let i=0;data.length>i;++i){
    
    const Category = await category.findOne({_id:data[i]?.category})
    const subCategory = await subcategory.findOne({_id:data[i]?.subcategory})
    const subsubCategory = await subsubcategory.findOne({_id:data[i]?.subsubcategory})

    
    list.push({
      id:data[i]?._id,
      title:data[i]?.title,
      category:Category?.title,
      subcategory:subCategory?.title,
      subsubcategory:subsubCategory?.title,
    })
  }
  return res.status(200).json({
    data:list,
    message: "success",
    status: "1",
  });
}


// Add product
async function addproduct(req, res) {
  console.log("addproduct", req.body)
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

  const productData = new product({ 
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    uses: req.body.uses,
    category: req.body.category,
    subcategory: req.body.subcategory,
    subsubcategory: req.body.subsubcategory,
    TotalVolume: req.body.TotalVolume,
    categorybyproduct: req.body.categorybyproduct,
    image: image,
  });

  db.Product.create(productData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// product by id
async function productById(req, res) {
  console.log("productById", req.body)
  if (__dirname == "/jinni/backend/jinni/controllers") {
    var PicUrl = `${process.env.URL}/uploads/product/`;
  } else {
    var PicUrl =
      "http://" + req.get("host") + "/uploads/product/";
  }
  const data = await product.findOne({ _id: req.body.id })
  const features = await feature.findOne({ _id: data.features })
  const categoryTitle = await category.findOne({ _id: data.category })
  const price = await pricing.findOne({ _id: data.pricing_category })
  console.log("feature", features.title)
  if(req.body.user_id != undefined){
    console.log()
    var heartStatus1 = ""
    const favourites1 = await db.Favourites.findOne({user_id:req.body.user_id,product_id:data.id})
    if(favourites1==null){
        heartStatus1="0"
    }else{
        heartStatus1=favourites1.heart_status
    }
}
  const productData = {
    title: data.title,
    url: data.url,
    category: categoryTitle.title,
    heartStatus:heartStatus1,
    short_discription: data.short_discription,
    discription: data.discription,
    features: features.title,
    pricing_category: price.title,
    price: data.price,
    association: data.association,
    created_at:data.created_at,
    id: data._id,
    image: PicUrl + data.image,
  };
  const categorybyproduct = await product.find({category:data.category})
  var simmilarproduct=[]
  for(let i=0;categorybyproduct.length>i;++i){
    if(req.body.user_id != undefined){
      console.log()
      var heartStatus = ""
      const favourites = await db.Favourites.findOne({user_id:req.body.user_id,product_id:categorybyproduct[i].id})
      if(favourites==null){
          heartStatus="0"
      }else{
          heartStatus=favourites.heart_status
      }
  }
   simmilarproduct.push({
    title: categorybyproduct[i].title,
    url: categorybyproduct[i].url,
    category: categoryTitle.title,
    heartStatus:heartStatus,
    short_discription: categorybyproduct[i].short_discription,
    discription: categorybyproduct[i].discription,
    features: features.title,
    pricing_category: price.title,
    price: categorybyproduct[i].price,
    association: categorybyproduct[i].association,
    id: categorybyproduct[i]._id,
    image: PicUrl + categorybyproduct[i].image,
    // image: categorybyproduct[i].image,
   })
  }
  const CommentList = []
  const comment = await db.Comment.find({productId:req.body.id})
  for(let i=0;comment.length>i;++i){
    const userTitle = await user.findOne({_id:comment[i].userId})

    CommentList.push({
  ratting:comment[i].ratting,
  comment:comment[i].comment,
  productId:comment[i].productId,
  userName:userTitle.full_name,
  created_at:userTitle.created_at,
 })
  }
  return res.status(200).json({
    data: productData,
    simmilarproduct:simmilarproduct,
    commentList:CommentList,
    comment:comment,
    messgae: "success",
    status: "1"
  })
}

// product Update
async function productUpdate(req, res) {
  console.log("productUpdate", req.body)

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

  await product.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      url: req.body.url,
      category: req.body.category,
      short_discription: req.body.shortDiscription,
      discription: req.body.discription,
      features: req.body.features,
      pricing_category: req.body.pricingCategory,
      price: req.body.price,
      association: req.body.association,
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

// productStatusUpdate
async function productStatusUpdate(req, res) {
  console.log("productStatusUpdate", req.body)

  await db.Product.updateOne({ _id: req.body.id },
    {
      verified: "verifieds",
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


// -------Category------------

//  CategoryList 
async function categoryList(req, res) {
  console.log("categoryList", req.body)

  const data = await category.find({status:"Active"}).sort({ _id: -1 });
  var list = []
  for(let i=0;data.length>i;++i){
    var productlength = await product.find({category:data[i].id})
    list.push({
      title:data[i].title,
      id:data[i]._id,
      subCategory:data[i].subCategory,
      image:data[i].image
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
        message: "success",
        status: "1",
      });
    } else {
      console.log("err",err)
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

    
    const Category = await category.find({})

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

  const data = await subcategory.find({status:"Active"}).sort({ _id: -1 });
  var list = []
  for(let i=0;data.length>i;++i){
    var categorydetail = await db.Category.find({_id:data[i].subCategory})
    list.push({
      title:data[i].title,
      subCategorytitle:categorydetail.title,
      subCategory:data[i].subCategory,
      image:data[i].image
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
    image:image
  });

  db.subCategory.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err",err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}
async function addsubcategoryList(req, res) {
  const CategoryList = await subcategory.find({category:req.body.id})
  console.log("Category",CategoryList)
  return res.status(200).json({
    Category: CategoryList,
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
  console.log("categoryList", req.body)

  const data = await subsubcategory.find({status:"Active"}).sort({ _id: -1 });
  var list = []
  for(let i=0;data.length>i;++i){
    var productlength = await product.find({category:data[i].id})
    list.push({
      title:data[i].title,
      subCategory:data[i].subCategory,
      image:data[i].image
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
    subCategory: req.body.subcategory,
  });

  db.subsubCategory.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err",err)
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

    
    const Category = await subsubcategory.find({subCategory:req.body.id})

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

  const data = await categorybyProduct.find({}).sort({ _id: -1 });
  var list = []
  for(let i=0;data.length>i;++i){
    var productlength = await product.find({category:data[i].id})
    list.push({
      title:data[i].title,
      subCategory:data[i].subCategory,
      image:data[i].image
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
    subCategory: req.body.subcategory,
  });

  db.Categorybyproduct.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err",err)
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


