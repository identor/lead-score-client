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
     * parse a date from a yyyy-mm-dd format
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
      var status = 'ok';
      dateRangeSelected(null, status, parseDate($scope.date.from), parseDate($scope.date.to));
      $modalInstance.close();
    };
    $scope.cancel = function() {
      var status = 'cancel';
      dateRangeSelected(null, status);
      $modalInstance.dismiss('cancel');
    };
  });
