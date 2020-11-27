var jwt = require('jsonwebtoken');

//import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')

//Create JSON Web Token for authenticating users
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, global.config.secretKey, {
        expiresIn: maxAge
    })
}


//  "tenant/signup"
module.exports.tenant_signup_get = (req, res) => {
    res.render('auth_tenant_signup', { page: "Tenant Sign Up" });
}


//  "host/signup"
module.exports.host_signup_get = (req, res) => {
    res.render('auth_host_signup', { page: "Host Sign Up" });
}


//  "signin"
module.exports.signin_get = (req, res) => {
    res.render('auth_signin', { page: "Sign In" });
}


//  tenant signup form
module.exports.tenant_signup_post = async (req, res) => {
    if (req.body.password1.length < 8) {
        res.json({message: 'Password must be at least 8 characters.'});
    } else if (req.body.password1 != req.body.password2) {
        res.json({message: 'Passwords must match.'})
    } else {

        try {
            const user = await Tenant.create({
                tenant_id: req.body.tenant_id,
                first: req.body.first,
                last: req.body.last,
                password: req.body.password1
            });
            const token = createToken(user.tenant_id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
            res.cookie('userType', 'tenant', { httpOnly: true, maxAge: maxAge*1000});
            res.status(200).json({ user: user.tenant_id });
        } catch (err) {
            //const errors = handleErrors(err);
            res.status(400).json({ err });
        }
    }
}


//  host signup form
module.exports.host_signup_post = async (req, res) => {
    if (req.body.password1.length < 8) {
        res.json({message: 'Password must be at least 8 characters.'});
    } else if (req.body.password1 != req.body.password2) {
        res.json({message: 'Passwords must match.'})
    } else {

        try {
            const user = await Host.create({
                host_id: req.body.host_id,
                host_name: req.body.host_name,
                host_since: req.body.host_since,
                host_location: req.body.host_location,
                host_neighborhood: req.body.host_neighborhood,
                host_listings_count: req.body.host_listings_count,
                password: req.body.password1
            });
            const token = createToken(user.host_id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
            res.cookie('userType', 'host', { httpOnly: true, maxAge: maxAge*1000});
            res.status(200).json({ user: user.host_id });
        } catch (err) {
            //const errors = handleErrors(err);
            res.status(400).json({ err });
        }

    }
}


//  tenant signin form
module.exports.tenant_signin_post = (req, res) => {
    if (req.body.tenant_id == "") {
        res.json({message: "Please enter a username."});
    } else {
        Tenant.findOne({'tenant_id': req.body.tenant_id}, (err, tenant)=>{
            if(!tenant) {
                res.json({message: req.body.tenant_id + ' not found.'});

            } else {
                tenant.comparePassword(req.body.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(!isMatch) return res.status(400).json({
                        message: 'Incorrect password.'
                    });

                    const token = createToken(req.body.tenant_id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000});
                    res.cookie('userType', 'tenant', { httpOnly: true, maxAge: maxAge*1000});

                    res.status(200).json({
                        message: 'Login Successful',
                        user: req.body.tenant_id
                    });
                })
            }
        })
    }
}


//  host signin form
module.exports.host_signin_post = (req, res) => {
    if (req.body.host_id == "") {
        res.json({message: "Please enter a username."});
    } else {
        Host.findOne({'host_id': req.body.host_id}, (err, host)=>{
            if(!host) {
                 res.json({message: req.body.host_id + ' not found '})
            } else {
                host.comparePassword(req.body.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(!isMatch) return res.status(400).json({
                        message: 'Incorrect password.'
                    });

                    const token = createToken(req.body.host_id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000});
                    res.cookie('userType', 'host', { httpOnly: true, maxAge: maxAge*1000});

                    res.status(200).json({
                        message: 'Login Successful',
                        user: req.body.host_id
                    });
                })
            }
        })
    }
}


//  "signout"
module.exports.signout_get = (req, res) => {
    res.cookie('jwt', "", { maxAge: 1 });
    res.cookie('userType', "", { maxAge: 1});
    res.redirect('/');
}
