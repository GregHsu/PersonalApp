'use strict';
const Game = require( '../models/Game' );
//console.log("loading the forms Controller")

exports.saveGame = ( req, res ) => {
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
      //res.redirect( '/index/'+arg._id );
      res.redirect( '/index/');
    } )
    .catch( error => {
      res.send( error );
    } );
};


exports.getAllGame = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Game.find()
    .exec()
    .then( ( infos ) => {
      console.dir(infos)
      res.render( 'index', {
        infos: infos, title: "games", version:"0.1"
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
exports.getOneGame = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Game.findOne({_id:id})
    .exec()
    .then( ( info ) => {
      console.dir(info)
      res.render( 'info', {
        info:info, title:"game"
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
