'use strict';

angular.module('daihaisyoApp')
  .factory('Haisyo', function($resource, $http) {
    return angular.element.extend($resource('/api/haisyos/', null, {
      recent: {
        method: 'GET',
        url: '/api/haisyos/new',
        isArray: true
      },
      before: {
        method: 'GET',
        url: '/api/haisyos/before',
        isArray: true
      }
    }), {
      checkBacklog: function(id, success) {
        $http.get('/api/haisyos/backlog_count', {
          params: {
            '_id': id
          }
        }).success(success);
      }
    });
  });