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
      user: '田中一郎',
      content: '会社見学'
    }, {
      user: '鈴木花子',
      content: '製品データ表送付'
    }, function(err) {
      console.log('finished populating haisyo');
    });
  }
});