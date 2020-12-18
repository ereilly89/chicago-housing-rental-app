var jwt = require('jsonwebtoken');

//import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";

//Create JSON Web Token for authenticating users
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, global.config.secretKey, {
        expiresIn: maxAge
    })
}


//  GET "tenant/signup"
module.exports.tenant_signup_get = (req, res) => {
    res.render('auth_tenant_signup', { page: "Tenant Sign Up" });
}


//  GET "host/signup"
module.exports.host_signup_get = (req, res) => {
    res.render('auth_host_signup', { page: "Host Sign Up" });
}


//  GET "signin"
module.exports.signin_get = (req, res) => {
    res.render('auth_signin', { page: "Sign In" });
}


//  POST "tenant/signup"
module.exports.tenant_signup_post = async (req, res) => {
    try {

        MongoClient.connect(url, async function (err, dbs) {
            if (err) throw err;
            const dbo = dbs.db("RentalDB");
            var tenant = await dbo.collection("Tenant").findOne({ "tenant_id": req.body.tenant_id });
            var phoneno = /^\d{10}$/;

            if (tenant != null) {
                res.json({ message: 'Username is taken.' });
            } else if (req.body.tenant_id.length < 6) {
                res.json({ message: 'Username must be at least 6 characters. '});
            } else if (!req.body.tenant_phone.match(phoneno)) {
                res.json({ message: 'Phone number must contain exactly 10 digits.' });
            } else if (req.body.first.length == 0) {
                res.json({ message: 'First name is required.' });
            } else if (req.body.last.length == 0) {
                res.json({ message: 'Last name is required.' });
            } else if (req.body.password1.length < 8) {
                res.json({ message: 'Password must be at least 8 characters.'});
            } else if (req.body.password1 != req.body.password2) {
                res.json({ message: 'Passwords must match.'})
            } else {
                try {
                    const user = await Tenant.create({
                        tenant_id: req.body.tenant_id,
                        tenant_phone: req.body.tenant_phone,
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
                    res.status(400).json({ err, message: 'Username is taken.' });
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }   
}


//  POST "host/signup"
module.exports.host_signup_post = async (req, res) => {
    try {

        MongoClient.connect(url, async function (err, dbs) {
            if (err) throw err;
            const dbo = dbs.db("RentalDB");
            var host = await dbo.collection("Host").findOne({ "host_id": req.body.host_id });
           
            var phoneno = /^\d{10}$/;

            if (host != null) {
                res.json({ message: 'Username is taken.' });
            } else if (req.body.host_id.length < 6) {
                res.json({ message: 'Username must be at least 6 characters.' });
            } else if (req.body.host_name.length == 0) {
                res.json({ message: 'Host name is required.' });
            } else if (!req.body.host_phone.match(phoneno)) {
                res.json({ message: 'Phone number must contain exactly 10 digits.' });
            } else if (req.body.host_about == 0) {
                res.json({ message: 'Host about is required.' })
            } else if (req.body.host_neighbourhood.length == 0) {
                res.json({ message: 'Host neighborhood is required. ' });
            } else if (req.body.password1.length < 8) {
                res.json({ message: 'Password must be at least 8 characters.' });
            } else if (req.body.password1 != req.body.password2) {
                res.json({ message: 'Passwords must match.' })
            } else {
                try {
                    const user = await Host.create({
                        host_id: req.body.host_id,
                        host_name: req.body.host_name,
                        host_phone: req.body.host_phone,
                        host_about: req.body.host_about,
                        host_since: req.body.host_since,
                        host_neighbourhood: req.body.host_neighbourhood,
                        host_listings_count: req.body.host_listings_count,
                        password: req.body.password1
                    });
                    const token = createToken(user.host_id);
                    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
                    res.cookie('userType', 'host', { httpOnly: true, maxAge: maxAge*1000});
                    res.status(200).json({ user: user.host_id });
                } catch (err) {
                    //const errors = handleErrors(err);
                    res.status(400).json({ err, message: 'Username is taken.' });
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
   
}



//  POST "tenant/signin"
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


//  POST "host/signin"
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
                    if(isMatch) return res.status(400).json({
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


//  GET "signout"
module.exports.signout_get = (req, res) => {
    res.cookie('jwt', "", { maxAge: 1 });
    res.cookie('userType', "", { maxAge: 1});
    res.redirect('/');
}
