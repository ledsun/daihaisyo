'use strict';

angular.module('daihaisyoApp')
	.controller('MainCtrl', function($scope, $http, Haisyo, $timeout, $window) {
		var debuglog = function() {
			var message = Array.prototype.slice.apply(arguments).join(',');
			$scope.debuglog = $scope.debuglog ? $scope.debuglog + '; ' + message : message;
			console.log(message);
		},
			doNothing = function() {};

		// モデルをActiveに
		$scope.model = function() {
			var setHaisyos = function(haisyos) {
				$scope.model.haisyos = haisyos;
			},
				push = function(haisyo) {
					$scope.model.haisyos.push(haisyo);
				},
				getLastHaisyo = function() {
					return $scope.model.haisyos[$scope.model.haisyos.length - 1];
				},
				//残り拝承数を確認します
				updateBacklogCount = function() {
					Haisyo.checkBacklog(getLastHaisyo()._id, function(count) {
						$scope.model.backlogCount = count;
						if (count === '0') {
							$scope.model.state.hasMoreHaisyo = 'none';
						} else {
							$scope.model.state.hasMoreHaisyo = 'any';
						}
					});
				};

			return {
				state: {
					online: false,
					hasMoreHaisyo: 'unknown', // none, unknown, anyの3状態があります。
					loading: false
				},
				// 先頭に拝承を追加
				unshift: function(haisyo) {
					$scope.$apply(function() {
						$scope.model.haisyos.unshift(haisyo);
					});
				},
				// 最新の拝承を取得
				getRecent: function() {
					Haisyo.recent(function(haisyos) {
						setHaisyos(haisyos);
						updateBacklogCount();
					});
				},
				// 過去の拝承を取得
				moreHaisyo: function() {
					$scope.model.state.loading = true;
					$scope.model.state.hasMoreHaisyo = 'unknown';

					Haisyo.before(getLastHaisyo(),
						function(haisyos) {
							$scope.model.state.loading = false;

							if (haisyos.length !== 0) {
								// 取得した拝承を一つずつレンダリング
								(function countUp() {
									var haisyo = haisyos.shift();

									push(haisyo);

									if (haisyos.length > 0) {
										$timeout(countUp, 200);
									} else {
										updateBacklogCount();
									}
								})();
							}
						},
						function() {
							$scope.model.state.loading = false;
							$scope.model.state.hasMoreHaisyo = 'any';
							goOffline();
						});
				},
				// 拝承処理
				doHaisyo: function doHaisyo() {
					if ($scope.model.content) {
						$scope.doHaisyo = doNothing;
						$scope.model.state.posting = 'posting';

						Haisyo.save({
								content: $scope.model.content
							},
							function() {
								$scope.model.content = '';
								$scope.doHaisyo = $scope.model.doHaisyo;
								$scope.model.state.posting = '';
							},
							function() {
								lastFunc = doHaisyo;
								goOffline();
								$scope.model.state.posting = '';
							}
						);
					}
				}
			};
		}();

		var lastFunc;
		// オフラインになったらイベントハンドラを無効に
		var goOffline = function(func) {
			$scope.model.state.online = false;
			$scope.doHaisyo = doNothing;
			$scope.moreHaisyo = doNothing;
		},
			// オンラインになったらイベントハンドラを有効に
			goOnline = function() {
				if (!$scope.model.state.online) {
					if (lastFunc) {
						lastFunc();
						lastFunc = null;
					}
					$scope.doHaisyo = $scope.model.doHaisyo;
					$scope.moreHaisyo = $scope.model.moreHaisyo;
					$scope.model.state.online = true;
				}
			};

		// socket.ioのイベントバインド
		var socket = io.connect(location.hostname, {
			'reconnect': false
		})
			.on('new_haisyo', function(msg) {
				// 追加された拝承を画面に追加
				$scope.model.unshift(msg.value);
			})
			.on('connect', function() {
				debuglog('connect webScoket');
				// WebScoketがつながったあとに残留拝承をPushします。
				$scope.$apply(goOnline);
			})
			.on('disconnect', function() {
				debuglog('disconnect webScoket');
				$scope.$apply(goOffline);
			});

		// スマートフォンでバックグラウンドにまわされていてオフラインになった時用、急に球が来たら再接続する
		// TODO オンラインイベントが拾えていない気がする
		angular.element($window)
			.on('focus online', function() {
				if (!$scope.model.state.online) {
					// 最新を取ってる時にpushするとエラーになるよ。
					// TODO たぶんこれは他人のPushとぶつかり得る
					// TODO $scope.model.haisyosをモデル内に隠蔽する
					debuglog('try get after');
					Haisyo.after($scope.model.haisyos[0],
						function(haisyos) {
							if (haisyos.length > 0) {
								$scope.model.haisyos = haisyos.concat($scope.model.haisyos);
							}
							// WebScoketがdisconnectを拾っていないことがある
							debuglog('success get after');
							debuglog('try reconnect webScoket', socket.socket.connected);
							if (socket.socket.connected) {
								goOnline();
							} else {
								socket.socket.reconnect();
							}
						},
						function() {
							debuglog('cannot connect!');
						}
					);
				}
			});

		// 最初はオンライン
		goOnline();

		// 拝承を取得
		$scope.model.getRecent();

		// とりあえず
		$scope.flush = doNothing;
	});