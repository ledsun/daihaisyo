'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Haisyo = mongoose.model('Haisyo');

/**
 * Populate database with sample application data
 */
// Add a default data, unless any data.
User.find().limit(1).exec(function(err, users) {
  if (!err && !users[0]) {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, function() {
      console.log('finished populating users');
    });
  }
});

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