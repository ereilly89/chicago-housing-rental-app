const jwt = require('jsonwebtoken');
const { Tenant } = require('../models/tenant');
const { Host } = require('../models/host');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, global.config.secretKey, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/signin');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/signin');
    }
}

// check current user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    const userType = req.cookies.userType;

    if (token && userType) {
        jwt.verify(token, global.config.secretKey, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.locals.userType = null;
                next();
            } else {
                console.log(decodedToken);
                if (userType == "host") {
                    let user = await Host.findOne({"host_id": decodedToken.id});
                    res.locals.user = user;
                    res.locals.userType = "host";
                } else if (userType == "tenant") {
                    let user = await Tenant.findOne({"tenant_id": decodedToken.id});
                    res.locals.user = user;
                    res.locals.userType = "tenant";
                }
                next();
            }
        })
    } else {
        res.locals.user = null;
        res.locals.userType = null;
        next();
    }
}


module.exports = { requireAuth, checkUser };
