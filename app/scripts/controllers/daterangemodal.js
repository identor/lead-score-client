'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:DaterangemodalCtrl
 * @description
 * # DaterangemodalCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('DateRangeModalCtrl', function ($scope, $modalInstance, dateRangeSelected) {
    $scope.date = {
      from: '2014-12-19T23:28:56.782Z',
      to: '2014-12-19T23:28:56.782Z'
    };
    $scope.items = [1, 2, 3];
    $scope.ok = function() {
      dateRangeSelected(null, new Date($scope.date.to), new Date($scope.date.from));
      $modalInstance.close();
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
