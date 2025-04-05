'use strict';

const express = require('express');
var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;

// Constants
const PORT = 8008;
const HOST = '0.0.0.0';

var url = "mongodb://asset_mapping:27017/user";

var profile_image = "";

// App
const app = express();
app.get('/', (req, res) => {
	var username = req.query.username;

	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;

  	var dbo = db.db('user');
  	dbo.collection('userProfile').findOne({ uname: username }, function(err, result) {
  		if (err) throw err;
    	profile_image = result.profile_image;
    	db.close();
    	});

	});

    res.status(200).send({
          username: username,
          profile_image: profile_image
    });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);