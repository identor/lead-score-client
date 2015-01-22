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
    /**
     * parse a date from a dd/mm/yyyy format
     */
    var parseDate = function(text) {
      return new Date(text);
    };
    $scope.date = {
      from: '',
      to: ''
    };
    $scope.items = [1, 2, 3];
    $scope.ok = function() {
      dateRangeSelected(null, parseDate($scope.date.from), parseDate($scope.date.to));
      $modalInstance.close();
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
