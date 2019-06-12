'use strict';
const Form = require( '../models/form' );
//console.log("loading the forms Controller")

exports.saveForm = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newForm = new Form(
    {
    name: req.body.name,
    comments: req.body.comments,
    }
  )

  //console.log("skill = "+newSkill)

  newForm.save()
    .then( () => {
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
    .then( ( form ) => {
      res.render( 'form', {
        comments: comments, title: "comments"
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
