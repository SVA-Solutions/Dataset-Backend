const db = require("_helpers/db");
const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { productList } = require("./Admin.controller");
const Pricing = require("twilio/lib/rest/Pricing");
const { Category } = require("../../_helpers/db");
var moment = require("moment");
const product = db.Product
const category = db.Category
const subcategory = db.subCategory
const subsubcategory = db.subsubCategory
const categorybyProduct = db.Categorybyproduct


module.exports = {
    Homepage,
    filter,
    regexapi,
    productDetailPage
}


async function Homepage(req, res) {
    console.log("Homepage", req.body)
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
            "http://" + req.get("host") + "/uploads/product/";
    }
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var categoryurl = `${process.env.URL}/uploads/subcategory/`;
    } else {
        var categoryurl =
            "http://" + req.get("host") + "/uploads/subcategory/";
    }
    const categorylist = await category.find({});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } });
    console.log("subcategorylist", subcategorylist)
    for (let j = 0; subcategorylist.length > j; ++j) {
        console.log("subsubcategorylist1", subcategorylist[j]._id)
        const subsubcategorylist = await subsubcategory.find({ subCategory: { $in: String(subcategorylist[j]._id) } });

        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
    const categorybyProductlist = await categorybyProduct.find({})
    const productlistarray = []
    for (let j = 0; categorybyProductlist.length > j; ++j) {
        var productlist = await product.find({ categorybyproduct: categorybyProductlist[j]._id })
        const list = []
        for (let d = 0; productlist.length > d; ++d) {
            list.push({
                title: productlist[d].title,
                id: productlist[d]._id,
                shortDescription: productlist[d].shortDescription,
                description: productlist[d].description,
                uses: productlist[d].uses,
                category: productlist[d].category,
                subcategory: productlist[d].subcategory,
                subsubcategory: productlist[d].subsubcategory,
                categorybyproduct: productlist[d].categorybyproduct,
                TotalVolume: productlist[d].TotalVolume,
                image: PicUrl + productlist[d].image,
            })
        }
        productlistarray.push({
            title: categorybyProductlist[j].title,
            data: list
        })
    }
    var productlistcount = await product.find({})
    return res.status(200).json({
        filter: subarraylist,
        categorylist: categorylist,
        productlist: productlistarray,
        count:productlistcount.length,
        messgae: "success",
        status: "1"
    })
}
async function filter(req, res) {
    console.log(req.body )
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
            "http://" + req.get("host") + "/uploads/product/";
    }
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var categoryurl = `${process.env.URL}/uploads/subcategory/`;
    } else {
        var categoryurl =
            "http://" + req.get("host") + "/uploads/subcategory/";
    }
    const categorylist = await category.find({});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } });
    console.log("subcategorylist", subcategorylist)
    for (let j = 0; subcategorylist.length > j; ++j) {
        console.log("subsubcategorylist", subcategorylist[j]._id)
        const subsubcategorylist = await subsubcategory.find({ subCategory: { $in: String(subcategorylist[j]._id) } });

        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
    const categorybyProductlist = await categorybyProduct.find({})
    const productlistarray = []
    for (let j = 0; categorybyProductlist.length > j; ++j) {
        const param1 = req.body.category
        const param2 = req.body.subsubcategory
         var query;
        if (param1 && param2) {
            query = { category: param1, subsubcategory: { $in: param2 } ,  categorybyproduct: categorybyProductlist[j]._id };
        } else if (param1 && param2 == []) {
            query = { category: param1, categorybyproduct: categorybyProductlist[j]._id };
        } else if (param2) {
            query = { subsubcategory: { $in: param2 }, categorybyproduct: categorybyProductlist[j]._id };
        }
        console.log("query",query)
        const productlist = await product.find(query)
        const list = []
        console.log("productlist",productlist)
        for (let d = 0; productlist.length > d; ++d) {
            list.push({
                title: productlist[d].title,
                shortDescription: productlist[d].shortDescription,
                description: productlist[d].description,
                uses: productlist[d].uses,
                category: productlist[d].category,
                subcategory: productlist[d].subcategory,
                subsubcategory: productlist[d].subsubcategory,
                categorybyproduct: productlist[d].categorybyproduct,
                image: PicUrl + productlist[d].image,
            })
        }
        productlistarray.push({
            title: categorybyProductlist[j].title,
            data: list
        })
    }
 
  
    
        const param14 = req.body.category
        const param24 = req.body.subsubcategory
         var query;
        if (param14 && param24) {
            query = { category: param14, subsubcategory: { $in: param24 }  };
        } else if (param14 && param24 == []) {
            query = { category: param14};
        } else if (param24) {
            query = { subsubcategory: { $in: param24 }};
        }
        console.log("query",query)
        const productlist4 = await product.find(query)
        const list4 = []
        console.log("productlist",productlist4)
        for (let d = 0; productlist4.length > d; ++d) {
            list4.push({
                title: productlist4[d].title,
                shortDescription: productlist4[d].shortDescription,
                description: productlist4[d].description,
                uses: productlist4[d].uses,
                category: productlist4[d].category,
                subcategory: productlist4[d].subcategory,
                subsubcategory: productlist4[d].subsubcategory,
                categorybyproduct: productlist4[d].categorybyproduct,
                image: PicUrl + productlist4[d].image,
            })
        }
    
    
    return res.status(200).json({
        filter: subarraylist,
        categorylist: categorylist,
        productlist: productlistarray,
        count:list4.length,
        messgae: "success",
        status: "1"
    })
}
async function regexapi(req, res) {
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
            "http://" + req.get("host") + "/uploads/product/";
    }
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var categoryurl = `${process.env.URL}/uploads/category/`;
    } else {
        var categoryurl =
            "http://" + req.get("host") + "/uploads/category/";
    }
    const categorylist = await category.find({});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } });
    console.log("subcategorylist", subcategorylist)
    for (let j = 0; subcategorylist.length > j; ++j) {
        console.log("subsubcategorylist", subcategorylist[j]._id)
        const subsubcategorylist = await subsubcategory.find({ subCategory: { $in: String(subcategorylist[j]._id) } });

        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
   
        const productlist = await product.find({title:new RegExp(req.body.search)})
        const list = []
        console.log("productlist",productlist)
        for (let d = 0; productlist.length > d; ++d) {
            list.push({
                title: productlist[d].title,
                shortDescription: productlist[d].shortDescription,
                description: productlist[d].description,
                uses: productlist[d].uses,
                category: productlist[d].category,
                subcategory: productlist[d].subcategory,
                subsubcategory: productlist[d].subsubcategory,
                categorybyproduct: productlist[d].categorybyproduct,
                image: PicUrl + productlist[d].image,
            })
        }
       const  productlistarray=[{
            title:"",
            data:list
        }]
    
    return res.status(200).json({
        filter: subarraylist,
        categorylist: categorylist,
        productlist: productlistarray,
        count:list.length,
        messgae: "success",
        status: "1"
    })
}
async function productDetailPage(req,res){
    console.log(req.body)
    if (__dirname == "/jinni/backend/jinni/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
            "http://" + req.get("host") + "/uploads/product/";
    }


    var productlist = await product.findOne({_id:req.body.id})
    var categorydata = await db.Category.findOne({_id:productlist.category})
    const list = {
        title: productlist.title,
        id: productlist._id,
        shortDescription: productlist.shortDescription,
        description: productlist.description,
        uses: productlist.uses,
        TotalVolume: categorydata?.TotalVolume,
        category: categorydata.title,
        subcategory: productlist.subcategory,
        subsubcategory: productlist.subsubcategory,
        categorybyproduct: productlist.categorybyproduct,
        updatedAt:productlist.updatedAt,
        image: PicUrl + productlist.image,
    }

     

    return res.status(200).json({
        product : list
    })
}