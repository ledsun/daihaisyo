'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Haisyo Schema
 */
var HaisyoSchema = new Schema({
  content: String
});

mongoose.model('Haisyo', HaisyoSchema);