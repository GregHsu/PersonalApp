'use strict';
const Game = require( '../models/Game' );
//console.log("loading the forms Controller")

exports.saveForm = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newGame = new Game(
    {
    gname: req.body.gname,
    gdeveloper: req.body.gdeveloper,
    ggenre: req.body.ggenre,
    gdate: req.body.gdate,
    gplatform: req.body.gplatform,
    ginfo: req.body.ginfo
    }
  )

  console.log("newGame = "+newGame)

  newGame.save()
    .then( (arg) => {
      res.redirect( '/game/'+arg._id );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// this displays all of the skills
exports.getOneGame = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Game.findOne({_id:id})
    .exec()
    .then( ( comments ) => {
      res.render( 'gname', {
        comments:comments, title:"gname"
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
