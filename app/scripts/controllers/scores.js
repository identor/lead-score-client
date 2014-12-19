'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('ScoresCtrl', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
    var ALL, DAY, WEEK, MONTH, RANGE;
    $scope.ALL = ALL = 'all';
    $scope.DAY = DAY = 'day';
    $scope.WEEK = WEEK = 'week';
    $scope.MONTH = MONTH = 'month';
    $scope.RANGE = RANGE = 'range';
    $scope.activeTab = ALL;

    $http.get('scores.json')
      .success(function(data, status, headers, config) {
        $scope.scores = data;
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log('Error');
      });

    $scope.openDateRangeModal = function() {
      var showDateRange = function(err, dateFrom, dateTo) {
        if (err) {
          return;
        }
        $scope.activeTab = RANGE;
        console.log(dateFrom+dateTo);
      };

      var modalInstance = $modal.open({
        resolve: {
          dateRangeSelected: function() {
            return showDateRange;
          }
        },
        templateUrl: 'views/daterangemodal.html',
        controller: 'DateRangeModalCtrl',
        windowClass: 'medium',
      });
    };

    $scope.showThisDay = function() {
      $scope.activeTab = DAY;
    };

    $scope.showThisWeek = function() {
      $scope.activeTab = WEEK;
    };

    $scope.showThisMonth = function() {
      $scope.activeTab = MONTH;
    };

    $scope.showAll = function() {
      $scope.activeTab = ALL;
    };

    $scope.isActive = function(tab) {
      if (tab == $scope.activeTab) {
        return 'active';
      }
      //console.log(tab);
    };
  }]);
