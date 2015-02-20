'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:ProductivitystatsCtrl
 * @description
 * # ProductivitystatsCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('ProductivityStatsCtrl', function ($scope, $modal, $log) {
    $scope.open = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/productivitystats.html',
        controller: 'ProductivityStatsModalInstanceCtrl',
        windowClass: 'small',
      });

      modalInstance.result.then(function () {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('ProductivityStatsModalInstanceCtrl', function ($scope, $modalInstance, $http) {
    $scope.stats;

    $http.get('/api/score/stats')
      .success(function (data) {
        $scope.stats = data[0];
        console.log($scope.stats);
      })
      .error(function (data) {
        console.log(data);
      });

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
