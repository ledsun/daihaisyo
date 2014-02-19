'use strict';

var index = require('./controllers'),
    haisyos = require('./controllers/haisyos');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.post('/api/haisyos', haisyos.create);
  app.get('/api/haisyos/new', haisyos.new);
  app.get('/api/haisyos/before', haisyos.before);
  app.get('/api/haisyos/count', haisyos.count);
  app.get('/api/haisyos/backlog_count', haisyos.backlogCount);
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};