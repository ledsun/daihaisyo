'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http, Haisyo, $timeout) {
		// ユーザ名を設定
		$scope.currentUserName = '名無し';

		// 最新の拝承を取得
		$scope.haisyos = Haisyo.recent();

		$scope.doHaisyo = function() {
			if ($scope.content) {
				Haisyo.save({
						user: $scope.currentUserName,
						content: $scope.content
					},
					function(haisyo) {
						$scope.haisyos.splice(0, 0, haisyo);
						$scope.content = '';
					});
			}
		};

		$scope.moreHaisyo = function() {
			$scope.showLoading = true;
			$scope.hideMoreHaisyo = true;

			Haisyo.before($scope.haisyos[$scope.haisyos.length - 1], function(haisyos) {
				$scope.showLoading = false;

				if (haisyos.length === 0) {
					$scope.hideMoreHaisyo = true;
					$scope.showLast = true;
				} else {
					(function countUp() {
						var haisyo = haisyos.shift();
						console.log('push', haisyo);

						$scope.haisyos.push(haisyo);

						if (haisyos.length > 0) {
							$timeout(countUp, 200);
						} else {
							$scope.hideMoreHaisyo = false;
						}
					})();
				}
			});

		};
	});