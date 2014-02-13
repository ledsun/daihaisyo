'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Haisyo Schema
 */
var HaisyoSchema = new Schema({
  user: String,
  content: String
});

mongoose.model('Haisyo', HaisyoSchema);