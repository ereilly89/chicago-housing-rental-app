const mongoose = require('mongoose');

const tenantSchema = mongoose.Schema({
    tenant_id:{
        type: String,
        required: true,
        unique: 1,
        trim: true,
        minLength: 6
    },
    first:{
        type: String,
        required: true,
        trim: true
    },
    last:{
        type: String,
        required: true,
        trim: true
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
tenantSchema.pre('save', function(next) {
    var tenant = this;

    if(tenant.isModified('password')) {
        bcrypt.genSalt(SALT, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(tenant.password, salt, function(err, hash) {
                if(err) return next(err);
                tenant.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})

tenantSchema.methods.comparePassword = function(candidatePassword, checkpassword) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return checkpassword(err)
        checkpassword(null, isMatch)
    })
}

/*
tenantSchema.statics.login = async function(username, password) {
    const tenant = await this.findOne({ username });
    if (tenant) {

    }
    throw Error('Incorrect ')
}
*/
const Tenant = mongoose.model('Tenant', tenantSchema, 'Tenant');

module.exports = { Tenant };
