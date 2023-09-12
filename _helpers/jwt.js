const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../macgence/controllers/Admin.controller');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authenticationss
           
            '/',
            '/macgini/addproduct',
            '/macgini/home',
            '/macgini/bannerList',
            '/macgini/regexapi',
            '/macgini/filter',
            '/macgini/productDetailPage',          
            '/macgini/emailfordatabase',        
            '/macgini/userList',
            '/macgini/login',
            '/macgini/ViewMore',
            '/macgini/email',
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
