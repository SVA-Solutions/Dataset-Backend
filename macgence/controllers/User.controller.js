const db = require("_helpers/db");
const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { productList } = require("./Admin.controller");
const Pricing = require("twilio/lib/rest/Pricing");
const { Category, Dataset } = require("../../_helpers/db");
const fs = require('fs');
const path = require('path');
var nodemailer = require("nodemailer");
var smtpTransports = require("nodemailer-smtp-transport");
const xml = require('xmlbuilder');
const product = db.Product
const category = db.Category
const subcategory = db.subCategory
const subsubcategory = db.subsubCategory
const categorybyProduct = db.Categorybyproduct
const User = db.User
const Email = db.Email


module.exports = {
    ViewMore,
    Homepage,
    filter,
    regexapi,
    productDetailPage,
    emailfordatabase,
    login,
    creatxml
}


async function ViewMore(req, res) {
    console.log("ViewMore", req.body)
    console.log*("__dirname",__dirname)
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
        process.env.cloudnary_Image_Url;
       
    }
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var categoryurl = `${process.env.URL}/uploads/subcategory/`;
    } else {
        var categoryurl =
            "http://" + "dataapi.macgence.com" + "/uploads/subcategory/";
    }
    const categorylist = await category.find({});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } });
    console.log("subcategorylist", subcategorylist)
    for (let j = 0; subcategorylist.length > j; ++j) {
        console.log("subsubcategorylist1", subcategorylist[j]._id)
        const subsubcategorylist = await subsubcategory.find({ subCategory: subcategorylist[j]._id  ,Category: { $in: req.body.id } });

        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
    
    const productlistarray = []
   
        var productlist = await product.find({})
        var list = []
        for (let d = 0; productlist.length > d; ++d) {
            const dataset = await db.Dataset.find({productId:productlist[d]._id})
            list.push({
                title: productlist[d].title,
                id: productlist[d]._id,
                shortDescription: productlist[d].shortDescription,
                description: productlist[d].description,
                uses: productlist[d].uses,
                category: productlist[d].category,
                slug: productlist[d].slug, slug: productlist[d].slug,
                subcategory: productlist[d].subcategory,
                subsubcategory: productlist[d].subsubcategory,
                categorybyproduct: productlist[d].categorybyproduct,
                TotalVolume: productlist[d].TotalVolume,
                Volume: productlist[d].Volume,
                AudioFileDuration: productlist[d].AudioFileDuration,
                image: PicUrl + productlist[d].image,
                dataset:dataset
            })
        }
        productlistarray.push({
            title: "",
            data: list
        })
      
    
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
async function Homepage(req, res) {

        var PicUrl =
        process.env.cloudnary_Image_Url;
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var categoryurl = `${process.env.URL}/uploads/subcategory/`;
    } else {
        var categoryurl =
            "http://" + "dataapi.macgence.com" + "/uploads/subcategory/";
    }
    const categorylist = await category.find({ status:"Active"});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } , status:"Active"});
    for (let j = 0; subcategorylist.length > j; ++j) {
        const subsubcategorylist = await subsubcategory.find({ subCategory: subcategorylist[j]._id  ,Category: { $in: req.body.id }, status:"Active" });
        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
    const categorybyProductlist = await categorybyProduct.find({ status:"Active"})
    const productlistarray = []
    for (let j = 0; categorybyProductlist.length > j; ++j) {
        var productlist = await product.find({ categorybyproduct: categorybyProductlist[j]._id , status:"Active" })
        const list = []
        for (let d = 0; productlist.length > d; ++d) {
            const dataset = await db.Dataset.find({productId:productlist[d]._id})
            list.push({
                title: productlist[d].title,
                id: productlist[d]._id,
                shortDescription: productlist[d].shortDescription,
                slug: productlist[d].slug,
                description: productlist[d].description,
                uses: productlist[d].uses.slice(0, 2),
                category: productlist[d].category,
                subcategory: productlist[d].subcategory,
                subsubcategory: productlist[d].subsubcategory,
                categorybyproduct: productlist[d].categorybyproduct,
                TotalVolume: productlist[d].TotalVolume,
                Volume: productlist[d].Volume,
                AudioFileDuration: productlist[d].AudioFileDuration,
                image: PicUrl + productlist[d].image,
                dataset:dataset
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
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
        process.env.cloudnary_Image_Url;
    }
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var categoryurl = `${process.env.URL}/uploads/subcategory/`;
    } else {
        var categoryurl =
        "http://" + "dataapi.macgence.com" + "/uploads/subcategory/";
    }
    const categorylist = await category.find({});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } , status:"Active"});
    console.log("subcategorylist", subcategorylist)
    for (let j = 0; subcategorylist.length > j; ++j) {
        console.log("subsubcategorylist", subcategorylist[j]._id)
        const subsubcategorylist = await subsubcategory.find({ subCategory: subcategorylist[j]._id ,Category: { $in: req.body.id } , status:"Active"});

        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
    const categorybyProductlist = await categorybyProduct.find({Category:{ $in: req.body.id } , status:"Active"})
    const productlistarray = []
    for (let j = 0; categorybyProductlist.length > j; ++j) {
        const param1 = req.body.category
        const param2 = req.body.subsubcategory
         var query;
         if (param1 && param2 ) {
            query = { category: param1, categorybyproduct: categorybyProductlist[j]._id , status:"Active"};
        }else if (param2 == []) {
            query = { subsubcategory: { $in: param2 }, categorybyproduct: categorybyProductlist[j]._id , status:"Active" };
        }
        else if (param1 && param2 == []) {
           
            query = { category: param1, subsubcategory: { $in: param2 } ,  categorybyproduct: categorybyProductlist[j]._id , status:"Active"};
        }
        console.log("query",query)
        const productlist = await product.find(query)
        console.log("productlistingasdefned",productlist )
        const list = []
        
        for (let d = 0; productlist?.length > d; ++d) {
            list.push({
                title: productlist[d]?.title,
                shortDescription: productlist[d]?.shortDescription,
                description:productlist[d]?.description,
                uses:productlist[d]?.uses.slice(0,2),
                slug: productlist[d].slug,
                category:productlist[d]?.category,
                subcategory:productlist[d]?.subcategory,
                subsubcategory:productlist[d]?.subsubcategory,
                categorybyproduct:productlist[d]?.categorybyproduct,
                Volume:productlist[d]?.Volume,
                id:productlist[d]?._id,
                AudioFileDuration:productlist[d]?.AudioFileDuration,
                image: PicUrl +productlist[d]?.image,
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
            query = { category: param14, subsubcategory: { $in: param24 } , status:"Active" };
        } else if (param14 && param24 == []) {
            query = { category: param14};
        } else if (param24) {
            query = { subsubcategory: { $in: param24 } , status:"Active"};
        }
        console.log("query",query)
        const productlist4 = await product.find(query)
        const list4 = []
        for (let d = 0; productlist4.length > d; ++d) {
            list4.push({
                title: productlist4[d].title,
                id: productlist4[d]._id,
                shortDescription: productlist4[d].shortDescription,
                description: productlist4[d].description,
                uses: productlist4[d].uses,
                category: productlist4[d].category,
                subcategory: productlist4[d].subcategory,
                subsubcategory: productlist4[d].subsubcategory,
                categorybyproduct: productlist4[d].categorybyproduct,
                Volume: productlist4[d].Volume,
                id: productlist4[d]._id,
                AudioFileDuration: productlist4[d].AudioFileDuration,
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
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
        process.env.cloudnary_Image_Url;
    }
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var categoryurl = `${process.env.URL}/uploads/subcategory/`;
    } else {
        var categoryurl =
        "http://" + "dataapi.macgence.com" + "/uploads/subcategory/";
    }
    const categorylist = await category.find({});

    var subarraylist = []
    const subcategorylist = await subcategory.find({ category: { $in: req.body.id } , status:"Active"});
    console.log("subcategorylist", subcategorylist)
    for (let j = 0; subcategorylist.length > j; ++j) {
        console.log("subsubcategorylist", subcategorylist[j]._id)
        const subsubcategorylist = await subsubcategory.find({ subCategory: { $in: String(subcategorylist[j]._id) } , status:"Active"});

        subarraylist.push({
            id: subcategorylist[j].id,
            title: subcategorylist[j].title,
            
            image: categoryurl + subcategorylist[j].image,
            data: subsubcategorylist
        })
    }
   
        const productlist = await product.find({title:new RegExp(req.body.search), status:"Active"})
        const list = []
        console.log("productlist",productlist)
        for (let d = 0; productlist.length > d; ++d) {
            list.push({
                title: productlist[d].title,
                shortDescription: productlist[d].shortDescription,
                description: productlist[d].description,
                uses: productlist[d].uses.slice(0,2),
                slug: productlist[d].slug, slug: productlist[d].slug,
                category: productlist[d].category,
                subcategory: productlist[d].subcategory,
                id: productlist[d]._id,
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
 
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var PicUrl = `${process.env.URL}/uploads/product/`;
    } else {
        var PicUrl =
        process.env.cloudnary_Image_Url;
    }
   
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var datasetUrl = `${process.env.URL}/uploads/upload/`;
    } else {
        var datasetUrl =
        "http://" + "dataapi.macgence.com" + "/uploads/upload/";
    }


    var productlist = await product.findOne({slug:req.body.id})
    var datasetlist = []
    var dataset = await db.Dataset.find({productId:productlist._id , status:"Active"})
    
    for (let d = 0; dataset.length > d; ++d) {
        datasetlist.push({
            productId:dataset[d].productId,
            Age:dataset[d].Age,
            Gender:dataset[d].Gender,
            Annotation:dataset[d].Annotation,

            channel1:dataset[d].channel1,
            channel2:dataset[d].channel2,
            English:dataset[d].English,
            Language:dataset[d].Language,
            Format:dataset[d].Format,
            image:PicUrl+dataset[d].image
        });
    }
  
    var categorydata = await db.Category.findOne({_id:productlist.category , status:"Active"})
    const list = {
        title: productlist.title,
        id: productlist._id,
        shortDescription: productlist.shortDescription,
        description: productlist.description,
        uses: productlist.uses,
        TotalVolume: categorydata?.TotalVolume,
        type: productlist?.type,
        metaTitle: productlist?.metaTitle,
        metadescription: productlist?.metadescription,
        category: categorydata.title,
        subcategory: productlist.subcategory,
        subsubcategory: productlist.subsubcategory,
        categorybyproduct: productlist.categorybyproduct,
        language: productlist.language,
        Country: productlist.Country,
        Dilacts: productlist.Dilacts,
        Genderdistribution: productlist.Genderdistribution,
        AgeGroups: productlist.AgeGroups,
        Enviorment: productlist.Enviorment,
        BitDepth: productlist.BitDepth,
        SampleRate: productlist.SampleRate,
        Channel: productlist.Channel,
        AudioFileDuration: productlist.AudioFileDuration,
        Demographic: productlist.Demographic,
        Countries: productlist.Countries,
        Format: productlist.Format,
        Resolution: productlist.Resolution,
        Annotation: productlist.Annotation,
        Volume: productlist.Volume,
        MediaType: productlist.MediaType,
        LanguagePain: productlist.LanguagePain,
        Type: productlist.Type,
        WordCount: productlist.WordCount,
        updatedAt:productlist.updatedAt,
        image: PicUrl + productlist.image,
        dataset:datasetlist,
    }
    var similarproductlist = await product.find({type:productlist.type , status:"Active"}).limit(4)
    var similarlist = []
    for (let j = 0; similarproductlist.length > j; ++j) {
            similarlist.push({
                title: similarproductlist[j].title,
                id: similarproductlist[j]._id,
                slug: similarproductlist[j].slug,
                shortDescription: similarproductlist[j].shortDescription,
                description: similarproductlist[j].description,
                uses: similarproductlist[j].uses,
                category: similarproductlist[j].category,
                subcategory: similarproductlist[j].subcategory,
                subsubcategory: similarproductlist[j].subsubcategory,
                categorybyproduct: similarproductlist[j].categorybyproduct,
                TotalVolume: similarproductlist[j].TotalVolume,
                image: PicUrl + similarproductlist[j].image,
                
            })
        }

    return res.status(200).json({
        product : list,
        similarproductlist:similarlist
    })
}

async function emailfordatabase(req, res) {
    console.log("forgotpassword code send", req.body);
    const email_number = req.body.email;
    var dataset = await db.Dataset.find({productId:req.body.productId})
    console.log("dataset",dataset)
    if (__dirname == "/macgence/backend/macgence/controllers") {
        var datasetUrl = process.env.cloudnary_Image_Url;
    } else {
        var datasetUrl =
        process.env.cloudnary_Image_Url
    }

    const categoryData = new Email({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        phonenumber: req.body.phonenumber,
        message: req.body.message,
        productId:req.body.productid
      });
    
      db.Email.create(categoryData, async function (err, result) {
        if (result) {
            console.log("succesfull")
        } else {
          console.log("err", err)
          
        }
      });

    mailOptions = {
      from: "noreply@emails.macgence.com",
      cc:"info@macgence.com",
      to: req.body.email,
      subject: "Sample Data",
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
        <img
        src="https://macgence.com/wp-content/uploads/2023/06/Macgence-Final-BI_Macgence-Main.webp"
        alt="macgence.com"
        style="height: 90px; max-width: 100%; width: 157px;"
        height="50"
        width="157"
        />
        </div>
        <p style="font-size:1.1em">Hi,  ${req.body.name}</p>
        <p style="font-size:1.1em">${email_number}</p>
        <p style="font-size:1.1em">${req.body.company}</p>
        <p>Thank you for choosing macgence.com. Here is Your sample dataset</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
        <p style="font-size:0.9em;">Regards,<br />macgence.com</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>macgence.com</p>
          <a  href="mailto:info@macgence.com?cc=secondemail@example.com &bcc=lastemail@example.com&subject=Mail from our Website&body=macgence Team"  style="color: #666;"  target="_blank" > info@macgence.ae  </a>
          </div>
          <a  href=${datasetUrl+dataset[0]?.image}  style="color: #666;"  target="_blank" > Click Here To Download  </a>
      </div>
     </div>`,
    // attachments: [
    //   {
    //     // File path or URL to the attachment
    //     path: datasetUrl + dataset[0]?.image,
    //     // Optional: Content type for the attachment
    //     // contentType: 'application/pdf', // or 'image/png', 'text/plain', etc.
    //     // Optional: Custom filename for the attachment
    //     // filename: 'custom_filename.pdf',
    //   },
    // ],
    };
    
    
    const smtpTransportss = nodemailer.createTransport(
        smtpTransports({
            host: "server1.secureclouddns.net",
            port: 465, // Update the port if needed
            secure: true,
            auth: {
                user: "noreply@emails.macgence.com",
                pass: "sdfsdH454dfhAKSDJR",
            },
        })
    );

      smtpTransportss.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          res.end("error");
        } else {
          console.log("Mail sent");
          res.status(200).json({
            message: "Check Your Mail ",
            status: "1",
          });
        }
      });
   
  }
  // Login Api
async function login(req, res) {
    console.log("login", req.body)

    if (req.body.email == "") {
        return res.status(200).json({
            message: language.Email_is_Required,
            status: "0",
        });
    }

    if (req.body.password == "") {
        return res.status(200).json({
            message: language.Password_is_Required,
            status: "0",
        });
    }

    const user = await User.findOne({ email: req.body.email.toLowerCase(), status: "Active" });
    if (!user) {
        return res.status(200).json({ message: "User Not found", status: "0" });
    }

    if (!user) {
        res.status(200).json({ message: "User Not found", status: "0" });
    } else {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ sub: user.id }, config.secret, {
                expiresIn: "365d",
            });
            db.User.updateOne(
                { _id: user.id },
                {
                    $set: {
                        token: token,
                    },
                },
                async function (err, result) {
                    if (result) {
                        const Users = await User.findOne({ email: req.body.email });
                        Userdata = {
                            full_name: Users?.full_name,
                            email: Users?.email,
                            role: Users?.role_id,
                            token: Users?.token,
                            created_at: Users?.created_at,
                            id: Users?._id,
                        };

                        console.log("Userdata", Userdata);
                        res.status(200).json({
                            message: " Success",
                            data: Userdata,
                            status: "1",
                        });
                    } else {
                        res.status(200).json({ message: "User Not Login", status: "0" });
                    }
                }
            );
        } else {
            res
                .status(200)
                .json({ message: "Invalid Email & Password", status: "0" });
        }
    }

}

async function creatxml(req,res){
    // try {
        const products = await product.find();
        const xmlData = xml.create({ urlset: { '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9' } });
    
        for (const product of products) {
          xmlData.ele('url')
            .ele('loc', `https://data.macgence.com/dataset/${product.slug}`)
            .up()
            .ele('lastmod', product.createdAt)
            .up()
            .up();
        }
    
        const xmlString = xmlData.end({ pretty: true });
    
        // Specify the folder and filename for storing the XML file
        const folderPath = path.join(__dirname, 'xml-files'); // Change 'xml-files' to your desired folder name
        const filename = 'products.xml';
    
        // Ensure the folder exists, or create it if necessary
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
    
        // Write the XML data to the file
        fs.writeFileSync(path.join(folderPath, filename), xmlString);
    
        res.status(200).json({ message: 'XML file created and stored successfully' });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Failed to generate and store XML file' });
    //   }
}