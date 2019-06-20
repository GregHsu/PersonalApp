'use strict';
const User = require( '../models/User' );

exports.update = ( req, res ) => {

  //update the User info for the current user ...
  //find the current Users profile
  //change the fields using req.body.userName etc
  //then save them....

  User.find(res.locals.user._id)
    .exec()
    .then((profile) => {
      profile.userName = req.body.userName
      profile.profilePicURL = req.body.profilePicURL
      profile.lastUpdate = new Date()
      profile.save()
      .then(() => {
        res.redirect('/profile');
      });
    });
};
