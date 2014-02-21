'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http, Haisyo, $timeout) {
		// 残り件数を取得
		var checkBacklog = function() {
			$http.get('/api/haisyos/backlog_count', {
				params: {
					'_id': $scope.haisyos[$scope.haisyos.length - 1]._id
				}
			}).success(function(count) {
				$scope.backlogCount = count;
				if (count === '0') {
					$scope.hideMoreHaisyo = true;
					$scope.showLast = true;
				}
			});
		}

		// 総拝承数を取得
		$scope.count = 0;
		$http.get('/api/haisyos/count').success(function(count) {
			$scope.count = count;
		});

		// 最新の拝承を取得
		Haisyo.recent(function(haisyos) {
			$scope.haisyos = haisyos;
			checkBacklog();
		});

		// 拝承処理
		$scope.doHaisyo = function() {
			if ($scope.content) {
				Haisyo.save({
						content: $scope.content
					},
					function(haisyo) {
						$scope.haisyos.splice(0, 0, haisyo);
						$scope.content = '';
						$scope.count++;
					});
			}
		};

		// 過去の拝承を取得
		$scope.moreHaisyo = function() {
			$scope.showLoading = true;
			$scope.hideMoreHaisyo = true;

			Haisyo.before($scope.haisyos[$scope.haisyos.length - 1], function(haisyos) {
				$scope.showLoading = false;

				if (haisyos.length !== 0) {
					// 取得した拝承を一つずつレンダリング
					(function countUp() {
						var haisyo = haisyos.shift();

						$scope.haisyos.push(haisyo);

						if (haisyos.length > 0) {
							$timeout(countUp, 200);
						} else {
							$scope.hideMoreHaisyo = false;

							//残り拝承数を確認します
							checkBacklog();
						}
					})();
				}
			});

		};
	});