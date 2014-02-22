'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http, Haisyo, $timeout) {
		// モデルを拡張する
		$scope.model = {
			setHaisyos: function(haisyos) {
				$scope.model.haisyos = haisyos;
			},
			getLastHaisyo: function() {
				return $scope.model.haisyos[$scope.model.haisyos.length - 1];
			},
			unshift: function(hasiyo) {
				$scope.$apply(function() {
					$scope.model.haisyos.unshift(hasiyo);
				});
			},
			push: function(haisyo) {
				$scope.model.haisyos.push(haisyo);
			},
			updateBacklogCount: function() {
				Haisyo.checkBacklog($scope.model.getLastHaisyo()._id, function(count) {
					$scope.model.backlogCount = count;
					if (count === '0') {
						$scope.model.hideMoreHaisyo = true;
						$scope.model.showLast = true;
					}
				});
			}
		};

		// socket.ioの受信準備
		io.connect(location.hostname).on('new_haisyo', function(msg) {
			// 追加された拝承を画面に追加
			$scope.model.unshift(msg.value);
		});

		// 最新の拝承を取得
		Haisyo.recent(function(haisyos) {
			$scope.model.setHaisyos(haisyos);
			$scope.model.updateBacklogCount();
		});

		// 拝承処理
		$scope.doHaisyo = function() {
			if ($scope.model.content) {
				Haisyo.save({
						content: $scope.model.content
					},
					function() {
						$scope.model.content = '';
					});
			}
		};

		// 過去の拝承を取得
		$scope.moreHaisyo = function() {
			$scope.model.showLoading = true;
			$scope.model.hideMoreHaisyo = true;

			Haisyo.before($scope.model.getLastHaisyo(), function(haisyos) {
				$scope.model.showLoading = false;

				if (haisyos.length !== 0) {
					// 取得した拝承を一つずつレンダリング
					(function countUp() {
						var haisyo = haisyos.shift();

						$scope.model.push(haisyo);

						if (haisyos.length > 0) {
							$timeout(countUp, 200);
						} else {
							$scope.model.hideMoreHaisyo = false;

							//残り拝承数を確認します
							$scope.model.updateBacklogCount();
						}
					})();
				}
			});
		};
	});