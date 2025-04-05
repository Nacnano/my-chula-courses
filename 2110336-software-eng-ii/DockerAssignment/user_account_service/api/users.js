//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

const http = require('axios');

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/', (req, res, next) => {

    //  Get the username.
    var username = req.query.username;
    if (!username) {
      throw new Error("When searching for a user, the username must be specified, e.g: '/?username=alice'.");
    }

    //  Get the user from the repo.
    options.repository.getUserByUsername(username).then((user) => {

      if(!user) { 
        res.status(404).send('User not found.');
      } else {
		http.get('http://asset_service:8008/?username='+user.username).then(function (response) {
      res.status(200).send({
          username: user.username,
          phoneNumber: user.phone_number,
		      profile_image: response.data.profile_image
        });
    })
    .catch(function (error) {
      console.error(error);
	    res.status(200).send({
          username: user.username,
          phoneNumber: user.phone_number,
		  profile_image: "Profile image not found"
        });
    });
      }
    })
    .catch(next);

  });
};
