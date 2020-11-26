
//Import models
const { Tenant } = require('../model/tenant')
const { Host } = require('../model/host')

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


// profile/tenant/:tenant_id
module.exports.profile_tenant_get = (req, res) => {
    var tenant_id = Number(req.params.tenant_id);
   Tenant.findOne({"tenant_id" : req.params.tenant_id})
   .then(data => {
     console.log(data);
     if (!data)
       res.render('profile_tenant', {page: 'Tenant Profile', message:"Profile not found."});
     else res.render('profile_tenant', {tenant: data, page: 'Tenant Profile'});
   })
   .catch(err => {
     res.render('profile_tenant', {page: 'Tenant Profile', message:"Error retrieving profile with id=" + id});
     console.log("err:"+err);
   });
}


// profile/host/:host_id
module.exports.profile_host_get = (req, res) => {
    var host_id = Number(req.params.host_id);
    MongoClient.connect(url, function(err, dbs) {
      if (err) throw err;
      const dbo = dbs.db("RentalDB");

      // Obtain a list of subjects
      const host = dbo.collection("Host").findOne({host_id: host_id});
      res.render('profile_host', {host: host, page: 'Host Profile'});
   });
}
