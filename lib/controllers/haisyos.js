'use strict';

var mongoose = require('mongoose'),
  Haisyo = mongoose.model('Haisyo');

exports.show = function(req, res) {
  return Haisyo.find().sort({
    '_id': 'desc'
  }).exec(function(err, haisyos) {
    if (!err) {
      return res.json(haisyos);
    } else {
      return res.send(err);
    }
  });
};

exports.create = function(req, res) {
  new Haisyo(req.body).save(function() {
    res.end();
  });
};