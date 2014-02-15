'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http, Haisyo) {
		// ユーザ名を設定
		$scope.currentUserName = '名無し';

		// 最新の拝承を取得
		$scope.haisyos = Haisyo.recent();

		$scope.moreHaisyo = function() {
			// すべての拝承を取得
			$scope.hideMoreHaisyo = true;
			$scope.showLoading = true;
			Haisyo.all(function(haisyos) {
				$scope.haisyos = haisyos;
				$scope.showLoading = false;
			});
		};

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
	});