'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('ScoresCtrl', ['$scope', '$http', '$modal',
              function ($scope, $http, $modal) {
    var ALL, DAY, WEEK, MONTH, RANGE, BAGUIO, BACOLOD, INDIA, MF, AU;
    $scope.ALL = ALL = 'All';
    $scope.DAY = DAY = 'This Day';
    $scope.WEEK = WEEK = 'This Week';
    $scope.MONTH = MONTH = 'This Month';
    $scope.RANGE = RANGE = 'Range';
    $scope.BAGUIO = BAGUIO = 'Baguio';
    $scope.BACOLOD = BACOLOD = 'Bacolod';
    $scope.INDIA = INDIA = 'India';
    $scope.MF = MF = 'Multifamily';
    $scope.AU = AU = 'Auto';
    $scope.activeTimeTab = ALL;
    $scope.activeBranchTab = ALL;
    $scope.activeIndustryTab = ALL;
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
        var filterDateRange = function(score) {
          var scoreDate = window.lastDate = new Date(score.date);
          return dateFrom <= scoreDate && dateTo >= scoreDate;
        };
        $scope.filteredScores = $scope.scores.filter(filterDateRange);
        $scope.activeTimeTab = RANGE;
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
      $scope.activeTimeTab = DAY;
    };

    $scope.showThisWeek = function() {
      /*
       * Returns a Date object which is the first day of the week
       * according to the date specified. `date` should also be
       * a Date object.
       */
      var firstDateOfWeek = function(date) {
        // Zero the hour, minute, and Milliseconds
        var d = new Date(date.toDateString());
        return new Date(+d - d.getDay() * 24 * 60 * 60 * 1000);
      };
      var thisWeek = function(score) {
        var now = new Date();
        var scoreDate = new Date(score.date)
        return +firstDateOfWeek(scoreDate) == +firstDateOfWeek(now);
      };
      $scope.filteredScores = $scope.scores.filter(thisWeek);
      $scope.activeTimeTab = WEEK;
    };

    $scope.showThisMonth = function() {
      var thisMonth = function(score) {
        var scoreDate = new Date(score.date);
        var now = new Date();
        return scoreDate.getFullYear() == now.getFullYear()
            && scoreDate.getMonth() == now.getMonth();
      };
      $scope.filteredScores = $scope.scores.filter(thisMonth);
      $scope.activeTimeTab = MONTH;
    };

    $scope.showAll = function() {
      $scope.activeTimeTab = ALL;
      $scope.filteredScores = $scope.scores;
    };

    $scope.setActiveIndustry = function(industry) {
      var filter = function(score) {
        if (industry == ALL) {
          return true;
        }
        return score.industry == industry;
      };
      $scope.filteredScores = $scope.scores.filter(filter);
      $scope.activeIndustryTab = industry;
    };

    $scope.setActiveBranch = function(branch) {
      var filter = function(score) {
        if (branch == ALL) {
          return true;
        }
        return score.branch == branch;
      };
      $scope.filteredScores = $scope.scores.filter(filter);
      $scope.activeBranchTab = branch;
    };

    $scope.isActiveTime = function(tab) {
      if (tab == $scope.activeTimeTab) {
        return 'active';
      }
    };

    $scope.isActiveIndustry = function(tab) {
      if (tab == $scope.activeIndustryTab) {
        return 'active';
      }
    };

    $scope.isActiveBranch = function(tab) {
      if (tab == $scope.activeBranchTab) {
        return 'active';
      }
    };
  }]);
