'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    function activeNameBasedOn(path, navs) {
      for (var key in navs) {
        if (navs[key].href.search(path) > -1) {
          return navs[key].name;
        }
      }
      return navs[0].name;
    };
    $scope.navs = [
      {
        'name': 'Upload',
        'href': '#/upload',
      },
      {
        'name': 'Scores',
        'href': '#/scores',
      }
    ];
    $scope.changeActive = function(name) {
      $scope.activeName = name;
    };
    $scope.activeName = activeNameBasedOn($location.path(), $scope.navs);
  }]);
