const express = require("express");
const router = express.Router();
const path = require("path");
const {uploadPhoto} = require('../futurePedia/middleware/uploadPhoto');
const {UploadAudio} = require('../futurePedia/middleware/uploadAudio')
const adminController = require("../futurePedia/controllers/Admin.controller");
const userController = require("../futurePedia/controllers/User.controller")
// ------ADMIN----------


// ----product--------
router.post("/addproduct",uploadPhoto("product", [{ name: "image", maxCount: 1 }]), addproduct);
router.get("/productList",productList);
router.post("/productById",productById);
router.post("/productUpdate",uploadPhoto("product", [{ name: "image", maxCount: 1 }]),productUpdate);
router.post("/productStatusUpdate",productStatusUpdate)
// ----category--------
router.post("/addcategory",addcategory);
router.get("/addcategoryList",addcategoryList);
router.get("/categoryList",categoryList);
router.post("/categoryById",categoryById);
router.post("/categoryUpdate",categoryUpdate);
router.post("/categoryDelete",  categoryDelete)
// ----subcategory--------
router.post("/addsubcategory",uploadPhoto("subcategory", [{ name: "image", maxCount: 1 }]),addsubcategory);
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
router.post("/adddataset",uploadPhoto("upload",[{ name: "image", maxCount: 1 }]),adddataset);
router.post("/adddataset/audio",UploadAudio("upload",[{ name: "image", maxCount: 1 }]),adddataset);
router.post("/adddataset/Text",adddataset);
router.post("/datasetById",datasetById);
router.post("/datasetUpdate",datasetUpdate);
router.post("/datasetDelete",  datasetDelete)




router.post("/home",Homepage)
router.post("/filter",filter)
router.post("/regexapi",regexapi)
router.post("/productDetailPage",productDetailPage)
router.post("/emailfordatabase",emailfordatabase)

module.exports = router;

router.get("/",function(req,res,next){
  return res.status(200).json({
    messgae: "wellcome to findup.ai",
    status: "1"
  })
})




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

