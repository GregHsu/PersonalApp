'use strict';
const Recipe = require( '../models/Recipes' );

exports.saveRecipes = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to the forum.")
  }

  let newRecipe = new Recipe(
   {
    userId: req.user._id,
    userName:req.user.googlename,
    r_name: req.body.r_name,
    r_ingredients: req.body.r_ingredients,
    r_direction: req.body.r_direction,
    r_createdAt: new Date()
   }
  )

  newRecipe.save()
    .then( () => {
      res.redirect( 'recipes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


exports.getAllRecipes = ( req, res, next ) => {
  Recipe.find({}).sort({r_createdAt: -1})
    .exec()
    .then( ( recipes ) => {
      res.render('recipes',{recipes:recipes,title:"Recipes"})
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};

exports.deleteRecipes = (req, res) => {
  console.log("in deleteRecipes")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      Recipe.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      Recipe.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      res.redirect('/recipes')
  } else {
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};
