'use strict';

angular.module('daihaisyoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'メインページ',
      'link': '/'
    }];
        
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
