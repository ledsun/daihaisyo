'use strict';

var mongoose = require('mongoose'),
  Haisyo = mongoose.model('Haisyo');

/**
 * Populate database with sample application data
 */
// Add a default data, unless any data.
Haisyo.find().limit(1).exec(function(err, haisyos) {
  if (!err && !haisyos[0]) {
    Haisyo.create({
      content: '会社見学'
    }, {
      content: '製品データ表送付'
    }, function(err) {
      console.log('finished populating haisyo');
    });
  }
});