'use strict';

var index = require('./controllers'),
    haisyos = require('./controllers/haisyos');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.post('/api/haisyos', haisyos.create(app));
  app.get('/api/haisyos/new', haisyos.new);
  app.get('/api/haisyos/before', haisyos.before);
  app.get('/api/haisyos/after', haisyos.after);
  app.get('/api/haisyos/backlog_count', haisyos.backlogCount);
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};