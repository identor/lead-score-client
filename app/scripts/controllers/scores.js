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
    $scope.filteredScores = [];

    $http.get('scores.json')
      .success(function(data, status, headers, config) {
        $scope.scores = $scope.filteredScores = data;
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log('Error');
      });

    $scope.openDateRangeModal = function() {
      var showDateRange = function(err, dateFrom, dateTo) {
        if (err) {
          console.error(err);
          return;
        }
        if (dateFrom == 'Invalid Date' || dateTo == 'Invalid Date') {
          console.error('Invalid Date: cannot continue!');
          return;
        }
        console.log(dateFrom);
        console.log(dateTo);
        var filterDateRange = function(score) {
          var scoreDate = window.lastDate = new Date(score.date);
          return dateFrom <= scoreDate && dateTo >= scoreDate;
        };
        $scope.filteredScores = $scope.scores.filter(filterDateRange);
        $scope.activeTab = RANGE;
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
      var today = function(score) {
        var scoreDate = new Date(score.date);
        var now = new Date();
        return scoreDate.getFullYear() == now.getFullYear()
            && scoreDate.getMonth() == now.getMonth()
            && scoreDate.getDate() == now.getDate();
      };
      $scope.filteredScores = $scope.scores.filter(today);
      $scope.activeTab = DAY;
    };

    $scope.showThisWeek = function() {
      var weekNumber = function(date) {
        // Copy date so don't modify original
        var d = new Date(+date);
        d.setHours(0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
        // Return array of year and week number
        return weekNo;
      };
      var thisWeek = function(score) {
        var scoreDate = new Date(score.date);
        var now = new Date();
        return scoreDate.getFullYear() == now.getFullYear()
            && weekNumber(scoreDate) == weekNumber(now);
      };
      $scope.filteredScores = $scope.scores.filter(thisWeek);
      $scope.activeTab = WEEK;
    };

    $scope.showThisMonth = function() {
      var thisMonth = function(score) {
        var scoreDate = new Date(score.date);
        var now = new Date();
        return scoreDate.getFullYear() == now.getFullYear()
            && scoreDate.getMonth() == now.getMonth();
      };
      $scope.filteredScores = $scope.scores.filter(thisMonth);
      $scope.activeTab = MONTH;
    };

    $scope.showAll = function() {
      $scope.activeTab = ALL;
      $scope.filteredScores = $scope.scores;
    };

    $scope.isActive = function(tab) {
      if (tab == $scope.activeTab) {
        return 'active';
      }
      //console.log(tab);
    };
  }]);
