'use strict';

angular.module('daihaisyoApp')
  .factory('Haisyo', function($resource) {
    return $resource('/api/haisyos/', null, {
      recent: {
        method: 'GET',
        url: '/api/haisyos/new',
        isArray: true
      },
      all: {
        method: 'GET',
        url: '/api/haisyos/all',
        isArray: true
      }
    });
  });