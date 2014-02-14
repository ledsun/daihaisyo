'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http) {
		// ユーザ名を取得
		$scope.currentUserName = $scope.currentUser ? $scope.currentUser.name : '名無し';

		// 最新の拝承を取得
		$http.get('/api/haisyos/new').success(function(haisyos) {
			$scope.haisyos = haisyos;
		});

		$scope.moreHaisyo = function() {
			// すべての拝承を取得
			$scope.hideMoreHaisyo = true;
			$scope.showLoading = true;
			$http.get('/api/haisyos/all').success(function(haisyos) {
				$scope.haisyos = haisyos;
				$scope.showLoading = false;
			});
		};

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