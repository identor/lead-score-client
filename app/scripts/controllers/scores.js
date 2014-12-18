'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('ScoresCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('scores.json')
      .success(function(data, status, headers, config) {
        $scope.scores = data;
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log('Error');
      });
  }]);
