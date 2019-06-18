'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var gameSchema = Schema( {
  gname: String,
  gdeveloper: String,
  ggenre: String,
  gdate: Date,
  gplatform: String,
  ginfo: String
} );

module.exports = mongoose.model( 'game', gameSchema );
