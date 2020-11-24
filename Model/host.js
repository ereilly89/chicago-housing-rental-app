const mongoose = require('mongoose');

const hostSchema = mongoose.Schema({
    host_id:{
        type: String,
        required: true,
        unique: 1,
        trim: true,
        minLength: 4
    },
    host_name:{
        type: String,
        required: true,
        trim: true
    },
    host_since:{
        type: String,
        required: true,
        trim: true
    },
    host_location:{
        type: String,
        required: true,
    },
    host_neighborhood:{
        type: String,
        required: true,
        trim: true
    },
    host_listings_count:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
});

const bcrypt = require('bcrypt');
let SALT = 10;

//Hash the Password
hostSchema.pre('save', function(next) {
    var host = this;

    if(host.isModified('password')) {
        bcrypt.genSalt(SALT, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(host.password, salt, function(err, hash) {
                if(err) return next(err);
                host.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})

hostSchema.methods.comparePassword = function(candidatePassword, checkpassword) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return checkpassword(err)
        checkpassword(null, isMatch)
    })
}

const Host = mongoose.model('Host', hostSchema, 'Host');

module.exports = { Host }
