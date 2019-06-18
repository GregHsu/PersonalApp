'use strict';
const Form = require( '../models/form' );
//console.log("loading the forms Controller")

exports.saveForm = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newForm = new Form(
    {
    name: req.user.googlename,
    comment: req.body.comment,
    }
  )

  console.log("newForm = "+newForm)

  newForm.save()
    .then( () => {
      console.log("saved the form data")
      res.redirect( '/forum' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// this displays all of the skills
exports.getAllForm = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Form.find()
    .exec()
    .then( ( comments ) => {
      res.render( 'forum', {
        comments: comments, title: "comments", version:"0.1"
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
