'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http) {
		$http.get('/api/awesomeThings').success(function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});

		// ユーザ名を取得
		$scope.currentUserName = $scope.currentUser ? $scope.currentUser.name : '名無し';

		// 保存されている拝承を取得
		$http.get('/api/haisyos').success(function(haisyos) {
			$scope.haisyos = haisyos;
		});


		$scope.doHaisyo = function() {
			if ($scope.content) {
				var newHaisyo = {
					user: $scope.currentUserName,
					content: $scope.content
				};

				$http({
					method: 'POST',
					url: '/api/haisyos',
					data: newHaisyo
				}).success(function() {
					$scope.haisyos.splice(0, 0, {
						user: $scope.currentUserName,
						content: $scope.content
					});
					$scope.content = '';
				});
			}
		};
	});