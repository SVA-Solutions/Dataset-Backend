const express = require("express");
const router = express.Router();
const path = require("path");

const {UploadAudio} = require('../macgence/middleware/uploadAudio')
const adminController = require("../macgence/controllers/Admin.controller");
const userController = require("../macgence/controllers/User.controller")

var multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_api_secrate
  });
  
  // Multer configuration
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'image-uploads', // Cloudinary folder where images will be stored
      allowedFormats: ['jpg', 'jpeg', 'png']
    }
  });
  const uploadPhoto = (folderName, fields) => {
    const upload = multer({ storage: storage }).fields(fields);
    return (req, res, next) => {
      upload(req, res, err => {
        if (err) {
          return res.status(400).json({ message: 'Image upload failed.' });
        }
        next();
      });
    };
  };

// ------ADMIN----------


// ----user--------
router.get("/userList", userList);
router.post("/addUser",addUser);
router.post("/userById",userById);
router.post("/userUpdate",userUpdate);
router.post("/userDelete",userDelete)
// ----product--------
router.post("/addproduct",uploadPhoto("product", [{ name: "image", maxCount: 1 }]), addproduct);
router.get("/productList",productList);
router.post("/productById",productById);
router.post("/productUpdate",uploadPhoto("product", [{ name: "image", maxCount: 1 }]),productUpdate);
router.post("/productStatusUpdate",productStatusUpdate)
router.post("/productDelete",productDelete)
router.post("/productByIdforupdate",productByIdforupdate)
// ----category--------
router.post("/addcategory",addcategory);
router.get("/addcategoryList",addcategoryList);
router.get("/categoryList",categoryList);
router.post("/categoryById",categoryById);
router.post("/categoryUpdate",categoryUpdate);
router.post("/categoryDelete",  categoryDelete)
// ----subcategory--------
router.post("/addsubcategory",uploadPhoto("product", [{ name: "image", maxCount: 1 }]),addsubcategory);
router.post("/subcategoryListbid",subcategoryListbid);
router.get("/subcategoryList",subcategoryList);
router.post("/addsubcategoryList",addsubcategoryList);
router.post("/subcategoryById",subcategoryById);
router.post("/subcategoryUpdate",subcategoryUpdate);
router.post("/subcategoryDelete",  subcategoryDelete)
// ----subsubcategory--------
router.post("/addsubsubcategory",addsubsubcategory);
router.get("/subsubcategoryList",subsubcategoryList);
router.post("/addsubsubcategoryList",addsubsubcategoryList);
router.post("/subsubcategoryById",subsubcategoryById);
router.post("/subsubcategoryUpdate",subsubcategoryUpdate);
router.post("/subsubcategoryDelete",  subsubcategoryDelete)
// ----subsubcategory--------
router.get("/categorybyproductList",categorybyproductList);
router.post("/addcategorybyproduct",addcategorybyproduct);
router.post("/categorybyproductById",categorybyproductById);
router.post("/categorybyproductUpdate",categorybyproductUpdate);
router.post("/categorybyproductDelete",  categorybyproductDelete)
// ----subsubcategory--------
router.get("/datasetList",datasetList);
router.post("/adddataset",uploadPhoto("product", [{ name: "image", maxCount: 1 }]),adddataset);
router.post("/adddataset/audio",UploadAudio("upload",[{ name: "image", maxCount: 1 }]),adddataset);
router.post("/adddataset",adddataset);
router.post("/datasetById",datasetById);
router.post("/datasetUpdate",datasetUpdate);
router.post("/datasetDelete",  datasetDelete)

// ----subsubcategory--------
router.get("/bannerList",bannerList);
router.post("/addBanner",uploadPhoto("product", [{ name: "image", maxCount: 1 }]),addBanner);
router.post("/bannerById",bannerById);
router.post("/bannerUpdate",UploadAudio("banner",[{ name: "image", maxCount: 1 }]),bannerUpdate);
router.post("/bannerDelete",  bannerDelete)




router.post("/ViewMore",ViewMore)
router.post("/home",Homepage)
router.post("/filter",filter)
router.post("/regexapi",regexapi)
router.post("/productDetailPage",productDetailPage)
router.post("/emailfordatabase",emailfordatabase)
router.post("/login",login)
router.get("/email",email)

module.exports = router;

router.get("/",function(req,res,next){
  return res.status(200).json({
    messgae: "wellcome to findup.ai",
    status: "1"
  })
})




// ----product--------

function userList(req, res,next){
  adminController
    .userList(req, res)
    .then((data) => console.log("userList"))
    .catch((err) => next(err));
}
function addUser(req, res,next){
  console.log("addUser",req.body)
  adminController
    .addUser(req, res)
    .then((data) => console.log("addUser"))
    .catch((err) => next(err));
}
function userById(req, res,next){
  adminController
    .userById(req, res)
    .then((data) => console.log("userById"))
    .catch((err) => next(err));}
function userUpdate(req, res,next){
  adminController
    .userUpdate(req, res)
    .then((data) => console.log("userUpdate"))
    .catch((err) => next(err));
}
function userDelete(req, res,next){
  adminController
    .userDelete(req, res)
    .then((data) => console.log("userDelete"))
    .catch((err) => next(err));
}

// ----product--------

function addproduct(req, res,next){
  adminController
    .addproduct(req, res)
    .then((data) => console.log("addproduct"))
    .catch((err) => next(err));
}
function productList(req, res,next){
  adminController
    .productList(req, res)
    .then((data) => console.log("productList"))
    .catch((err) => next(err));
}
function productById(req, res,next){
  adminController
    .productById(req, res)
    .then((data) => console.log("productById"))
    .catch((err) => next(err));}
function productUpdate(req, res,next){
  adminController
    .productUpdate(req, res)
    .then((data) => console.log("productUpdate"))
    .catch((err) => next(err));
}
function productStatusUpdate(req, res,next){
  adminController
    .productStatusUpdate(req, res)
    .then((data) => console.log("productStatusUpdate"))
    .catch((err) => next(err));
}
function productDelete(req, res,next){
  adminController
    .productDelete(req, res)
    .then((data) => console.log("productDelete"))
    .catch((err) => next(err));
}
function productByIdforupdate(req, res,next){
  adminController
    .productByIdforupdate(req, res)
    .then((data) => console.log("productByIdforupdate"))
    .catch((err) => next(err));
}




// ----category--------

function addcategory(req, res,next){
  adminController
    .addcategory(req, res)
    .then((data) => console.log("addcategory"))
    .catch((err) => next(err));
}
function categoryList(req, res,next){
  adminController
    .categoryList(req, res)
    .then((data) => console.log("categoryList"))
    .catch((err) => next(err));
}
function addcategoryList(req, res,next){
  adminController
    .addcategoryList(req, res)
    .then((data) => console.log("addcategoryList"))
    .catch((err) => next(err));
}
function categoryById(req, res,next){
  adminController
    .categoryById(req, res)
    .then((data) => console.log("categoryById"))
    .catch((err) => next(err));}
function categoryUpdate(req, res,next){
  adminController
    .categoryUpdate(req, res)
    .then((data) => console.log("categoryUpdate"))
    .catch((err) => next(err));
}
function categoryDelete(req, res,next){
  adminController
    .categoryDelete(req, res)
    .then((data) => console.log("categoryDelete"))
    .catch((err) => next(err));
}


// ----subcategory--------

function addsubcategory(req, res,next){
  adminController
    .addsubcategory(req, res)
    .then((data) => console.log("addsubcategory"))
    .catch((err) => next(err));
}
function addsubcategoryList(req, res,next){
  adminController
    .addsubcategoryList(req, res)
    .then((data) => console.log("addsubcategoryList"))
    .catch((err) => next(err));
}
function subcategoryList(req, res,next){
  adminController
    .subcategoryList(req, res)
    .then((data) => console.log("subcategoryList"))
    .catch((err) => next(err));
}
function subcategoryListbid(req, res,next){
  adminController
    .subcategoryListbid(req, res)
    .then((data) => console.log("subcategoryListbid"))
    .catch((err) => next(err));
}
function subcategoryById(req, res,next){
  adminController
    .subcategoryById(req, res)
    .then((data) => console.log("subcategoryById"))
    .catch((err) => next(err));}
function subcategoryUpdate(req, res,next){
  adminController
    .subcategoryUpdate(req, res)
    .then((data) => console.log("subcategoryUpdate"))
    .catch((err) => next(err));
}
function subcategoryDelete(req, res,next){
  adminController
    .subcategoryDelete(req, res)
    .then((data) => console.log("subcategoryDelete"))
    .catch((err) => next(err));
}


// ----subsubcategory--------

function addsubsubcategory(req, res,next){
  adminController
    .addsubsubcategory(req, res)
    .then((data) => console.log("addsubsubcategory"))
    .catch((err) => next(err));
}
function addsubsubcategoryList(req, res,next){
  adminController
    .addsubsubcategoryList(req, res)
    .then((data) => console.log("addsubsubcategoryList"))
    .catch((err) => next(err));
}
function subsubcategoryList(req, res,next){
  adminController
    .subsubcategoryList(req, res)
    .then((data) => console.log("subsubcategoryList"))
    .catch((err) => next(err));
}
function subsubcategoryById(req, res,next){
  adminController
    .subsubcategoryById(req, res)
    .then((data) => console.log("subsubcategoryById"))
    .catch((err) => next(err));}
function subsubcategoryUpdate(req, res,next){
  adminController
    .subsubcategoryUpdate(req, res)
    .then((data) => console.log("subsubcategoryUpdate"))
    .catch((err) => next(err));
}
function subsubcategoryDelete(req, res,next){
  adminController
    .subsubcategoryDelete(req, res)
    .then((data) => console.log("subsubcategoryDelete"))
    .catch((err) => next(err));
}


// ----subsubcategory--------

function categorybyproductList(req, res,next){
  adminController
    .categorybyproductList(req, res)
    .then((data) => console.log("categorybyproductList"))
    .catch((err) => next(err));
}
function addcategorybyproduct(req, res,next){
  adminController
    .addcategorybyproduct(req, res)
    .then((data) => console.log("addcategorybyproduct"))
    .catch((err) => next(err));
}
function categorybyproductById(req, res,next){
  adminController
    .categorybyproductById(req, res)
    .then((data) => console.log("categorybyproductById"))
    .catch((err) => next(err));}
function categorybyproductUpdate(req, res,next){
  adminController
    .categorybyproductUpdate(req, res)
    .then((data) => console.log("categorybyproductUpdate"))
    .catch((err) => next(err));
}
function categorybyproductDelete(req, res,next){
  adminController
    .categorybyproductDelete(req, res)
    .then((data) => console.log("categorybyproductDelete"))
    .catch((err) => next(err));
}


// ----dataset--------

function datasetList(req, res,next){
  adminController
    .datasetList(req, res)
    .then((data) => console.log("datasetList"))
    .catch((err) => next(err));
}
function adddataset(req, res,next){
  adminController
    .adddataset(req, res)
    .then((data) => console.log("adddataset"))
    .catch((err) => next(err));
}
function datasetById(req, res,next){
  adminController
    .datasetById(req, res)
    .then((data) => console.log("datasetById"))
    .catch((err) => next(err));}
function datasetUpdate(req, res,next){
  adminController
    .datasetUpdate(req, res)
    .then((data) => console.log("datasetUpdate"))
    .catch((err) => next(err));
}
function datasetDelete(req, res,next){
  adminController
    .datasetDelete(req, res)
    .then((data) => console.log("datasetDelete"))
    .catch((err) => next(err));
}


// ----Banner--------

function bannerList(req, res,next){
  adminController
    .bannerList(req, res)
    .then((data) => console.log("bannerList"))
    .catch((err) => next(err));
}
function addBanner(req, res,next){
  adminController
    .addBanner(req, res)
    .then((data) => console.log("addBanner"))
    .catch((err) => next(err));
}
function bannerById(req, res,next){
  adminController
    .bannerById(req, res)
    .then((data) => console.log("bannerById"))
    .catch((err) => next(err));
  }

function bannerUpdate(req, res,next){
  adminController
    .bannerUpdate(req, res)
    .then((data) => console.log("bannerUpdate"))
    .catch((err) => next(err));
}
function bannerDelete(req, res,next){
  adminController
    .bannerDelete(req, res)
    .then((data) => console.log("bannerDelete"))
    .catch((err) => next(err));
}






function ViewMore(req, res,next){
  userController
    .ViewMore(req, res)
    .then((data) => console.log("ViewMore"))
    .catch((err) => next(err));
}
function Homepage(req, res,next){
  userController
    .Homepage(req, res)
    .then((data) => console.log("Homepage"))
    .catch((err) => next(err));
}

function filter(req, res,next){
  userController
    .filter(req, res)
    .then((data) => console.log("filter"))
    .catch((err) => next(err));
}
function regexapi(req, res,next){
  userController
    .regexapi(req, res)
    .then((data) => console.log("regexapi"))
    .catch((err) => next(err));
}
function productDetailPage(req, res,next){
  userController
    .productDetailPage(req, res)
    .then((data) => console.log("productDetailPage"))
    .catch((err) => next(err));
}
function emailfordatabase(req, res,next){
  userController
    .emailfordatabase(req, res)
    .then((data) => console.log("emailfordatabase"))
    .catch((err) => next(err));
}
function login(req, res,next){
  userController
    .login(req, res)
    .then((data) => console.log("login"))
    .catch((err) => next(err));
}
function email(req, res,next){
  adminController
    .email(req, res)
    .then((data) => console.log("email"))
    .catch((err) => next(err));
}

