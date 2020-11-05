const express = require('express')
const app = express();
const port = 3000;


app.get('/', (req, res) => {
const MongoClient = require('mongodb').MongoClient;

/* You may have to change the URL based on your connection string.
   Replace username and password with correct values.
*/
const uri = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

   client.connect(err => {
  const collection = client.db("uwwDB").collection("subjects").find().toArray( (err, subjects) => {

    if (err) {
		res.send('error');
	}
	
	res.send(subjects)
   console.log(subjects);
  client.close();

});


});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
