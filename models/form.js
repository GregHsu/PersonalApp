'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var formSchema = Schema( {
  name: String,
  comment: String
} );

module.exports = mongoose.model( 'form', formSchema );
