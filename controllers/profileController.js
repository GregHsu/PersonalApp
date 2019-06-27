'use strict';
const User = require( '../models/User' );

exports.update = ( req, res ) => {

  //update the User info for the current user ...
  //find the current Users profile
  //change the fields using req.body.userName etc
  //then save them....

  User.findOne(res.locals.user._id)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    p.userName = req.body.userName
    p.profilePicURL = req.body.profilePicURL
    p.lastUpdate = new Date()
    p.save()
    .then(() => {
      res.redirect( '/profile' );
    })

   })
};

exports.getAllProfiles = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  User.find()
    .exec()
    .then( ( profiles ) => {
      res.render( 'profiles', {
        profiles:profiles, title:"Profiles"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

 // this displays all of the skills
exports.getOneProfile = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  User.findOne({_id:id})
    .exec()
    .then( ( profile ) => {
      res.render( 'showProfile', {
        profile:profile, title:"Profile"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
