'use strict';

var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	mongoose = require('mongoose');

/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function(file) {
	require(modelsPath + '/' + file);
});

// Populate empty DB with sample data
require('./lib/config/dummydata');

var app = express();

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
var server = app.listen(config.port, function() {
	console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// socket.ioでlisten
app.io = require('socket.io')(server);

// Expose app
exports = module.exports = app;
