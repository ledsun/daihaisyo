'use strict';

angular.module('daihaisyoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
