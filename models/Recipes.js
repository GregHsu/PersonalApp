'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var recipesSchema = Schema( {
  userId: ObjectId,
  userName: String,
  r_name: String,
  r_ingredients: String,
  r_direction: String,
  r_createdAt: Date
} );

module.exports = mongoose.model( 'recipes', recipesSchema );
