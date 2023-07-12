const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../futurePedia/controllers/Admin.controller');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authenticationss
            '/',
            '/macgini/addproduct',
            '/macgini/productList',
            '/macgini/addcategory',
            '/macgini/categoryById',
            '/macgini/categoryDelete',
            '/macgini/categoryUpdate',
            '/macgini/categoryList',
            '/macgini/addcategoryList',
            '/macgini/addsubcategoryList',
            '/macgini/addsubsubcategoryList',
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
