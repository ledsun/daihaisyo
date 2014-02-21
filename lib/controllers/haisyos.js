'use strict';

var mongoose = require('mongoose'),
  Haisyo = mongoose.model('Haisyo');

exports.new = function(req, res) {
  return Haisyo.find().sort({
    '_id': 'desc'
  }).limit(8).exec(function(err, haisyos) {
    if (!err) {
      return res.json(haisyos);
    } else {
      return res.send(err);
    }
  });
};

exports.before = function(req, res) {
  return Haisyo.find().where('_id').lt(req.query._id).sort({
    '_id': 'desc'
  }).limit(19).exec(function(err, haisyos) {
    if (!err) {
      return res.json(haisyos);
    } else {
      return res.send(err);
    }
  });
};

exports.count = function(req, res) {
  return Haisyo.count({}, function(err, c) {
    return res.json(c);
  });
};

exports.backlogCount = function(req, res) {
  return Haisyo.find().where('_id').lt(req.query._id).count(function(err, c) {
    return res.json(c);
  });
};

exports.create = function(req, res) {
  new Haisyo(req.body).save(function() {
    res.end();
  });
};