'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:DaterangemodalCtrl
 * @description
 * # DaterangemodalCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('DateRangeModalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function() {
      $modalInstance.close();
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
