const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../macgence/controllers/Admin.controller');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authenticationss
            '/macgini/adddataset/audio',
            '/',
            '/macgini/addproduct',
            '/macgini/productList',
            '/macgini/adddataset',
            '/macgini/addcategory',
            '/macgini/categoryById',
            '/macgini/categoryDelete',
            '/macgini/categoryUpdate',
            '/macgini/categoryList',
            '/macgini/addcategoryList',
            '/macgini/addsubcategoryList',
            '/macgini/addsubsubcategoryList',
            '/macgini/subcategoryListbid',
            '/macgini/subcategoryList',
            '/macgini/subsubcategoryList',
            '/macgini/addsubcategory',
            '/macgini/addsubsubcategory',
            '/macgini/addcategorybyproduct',
            '/macgini/home',
            '/macgini/regexapi',
            '/macgini/filter',
            '/macgini/productDetailPage',
            '/macgini/productList',
            '/macgini/categorybyproductList',
            '/macgini/datasetList',
            '/macgini/adddataset/Text',
            '/macgini/emailfordatabase',
            '/macgini/datasetDelete',
            '/macgini/userList',
            '/macgini/addUser',
            '/macgini/userById',
            '/macgini/userUpdate',
            '/macgini/userDelete',
            '/macgini/login',
            '/macgini/productStatusUpdate',
            '/macgini/productDelete',
            '/macgini/productById',
            '/macgini/productByIdforupdate',
            '/macgini/productUpdate',
        
        ]
    });
}
async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    done();
}; 
