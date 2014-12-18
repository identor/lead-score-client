'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:DaterangemodalCtrl
 * @description
 * # DaterangemodalCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('DaterangemodalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function() {
      $modalInstance.close();
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
