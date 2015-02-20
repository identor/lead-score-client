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
    var ALL, DAY, WEEK, MONTH, RANGE, MF, AU, DEFAULT;
    $scope.loading = true;
    $scope.ALL = ALL = 'All';
    $scope.DEFAULT = DEFAULT = function(element) {
      return true;
    };
    $scope.DAY = DAY = 'This Day';
    $scope.WEEK = WEEK = 'This Week';
    $scope.MONTH = MONTH = 'This Month';
    $scope.RANGE = RANGE = 'Range';
    $scope.MF = MF = 'Multifamily';
    $scope.AU = AU = 'Auto';
    $scope.timeFilter = DEFAULT;
    $scope.branchFilter = DEFAULT;
    $scope.industryFilter = DEFAULT;
    $scope.activeTimeTab = ALL;
    $scope.activeBranchTab = ALL;
    $scope.activeIndustryTab = ALL;
    $scope.filteredScores = [];
    $scope.searchedScores = [];
    $scope.branchFilters = [];
    $scope.industriesFilters = [];
    $scope.limit = 1000;
    $scope.alerts = [
      {
        type: 'warning radius',
        msg: 'Applications slows down due to the massive data source, please use `Limit`.'
      }
    ];

    $http.get('/api/leadscore/industries')
      .success(function (data) {
        $scope.industriesFilters = data;
      })
      .error(function (data) {
        console.log(data);
      });

    $http.get('/api/leadscore/branches')
      .success(function (data) {
        $scope.branchFilters = data;
      })
      .error(function (data) {
        console.log(data);
      });

    $http.get('/api/score/productivity')
      .success(function(data, status, headers, config) {
        $scope.scores = $scope.filteredScores = data;
        $scope.loading = false;
      })
      .error(function(data, status, headers, config) {
        console.log('Error');
      });

    /**
     * Filter the scores accordingly.
     */
    $scope.applyFilters = function() {
      $scope.filteredScores = $scope.scores.filter($scope.timeFilter);
      $scope.filteredScores = $scope.filteredScores.filter($scope.branchFilter);
      $scope.filteredScores = $scope.filteredScores.filter($scope.industryFilter);
    };

    $scope.getTotalProcessingTime = function() {
      var scores = $scope.getTableData(),
          total = 0;
      for (var i in scores) {
        total += +scores[i].totalProcessingTime;
      }
      return total;
    }

    $scope.getTotalCallDuration = function() {
      var scores = $scope.getTableData(),
          total = 0;
      for (var i in scores) {
        total += +scores[i].totalCallDuration;
      }
      return total;
    };

    $scope.getTotalCallCount = function() {
      var scores = $scope.getTableData(),
          total = 0;
      for (var i in scores) {
        total += +scores[i].callCount;
      }
      return total;
    };

    $scope.getAverageProcessingTime = function() {
      var total = $scope.getTotalProcessingTime();
      return total / $scope.getTableData().length
    };

    $scope.getAverageCallDuration = function() {
      var total = $scope.getTotalProcessingTime();
      return total / $scope.getTableData().length
    };

    $scope.getAverageCallCount = function() {
      var total = $scope.getTotalCallCount();
      return total / $scope.getTableData().length
    };

    $scope.openDateRangeModal = function() {
      var lastActiveTab = $scope.activeTimeTab;
      var showDateRange = function(err, status, dateFrom, dateTo) {
        if (err) {
          console.error(err);
          return;
        }
        if (dateFrom == 'Invalid Date' || dateTo == 'Invalid Date') {
          console.error('Invalid Date: cannot continue!');
          return;
        }
        var filterDateRange = function(score) {
          var scoreDate = new Date(score.date);
          return dateFrom <= scoreDate && dateTo >= scoreDate;
        };
        if (status == 'ok') {
          $scope.timeFilter = filterDateRange;
          $scope.activeTimeTab =  RANGE;
          $scope.applyFilters();
        } else {
          $scope.activeTimeTab =  lastActiveTab;
        }
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
      $scope.timeFilter = today;
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
      $scope.timeFilter = thisWeek;
    };

    $scope.showThisMonth = function() {
      var thisMonth = function(score) {
        var scoreDate = new Date(score.date);
        var now = new Date();
        return scoreDate.getFullYear() == now.getFullYear()
            && scoreDate.getMonth() == now.getMonth();
      };
      $scope.timeFilter = thisMonth;
    };

    $scope.showAll = function() {
      $scope.timeFilter = DEFAULT;
    };

    $scope.setActiveTime = function(time) {
      switch (time) {
      case ALL:
        $scope.showAll();
        break;
      case DAY:
        $scope.showThisDay();
        break;
      case WEEK:
        $scope.showThisWeek();
        break;
      case MONTH:
        $scope.showThisMonth();
        break;
      case RANGE:
        $scope.openDateRangeModal();
        break;
      }
      $scope.activeTimeTab = time;
      $scope.applyFilters();
    };

    $scope.setActiveIndustry = function(industry) {
      var filter = function(score) {
        if (industry == ALL) {
          return true;
        }
        return score.industry == industry;
      };
      $scope.industryFilter = filter;
      $scope.activeIndustryTab = industry;
      $scope.applyFilters();
    };

    $scope.setActiveBranch = function(branch) {
      var filter = function(score) {
        if (branch == ALL) {
          return true;
        }
        return score.branch == branch;
      };
      $scope.branchFilter = filter;
      $scope.activeBranchTab = branch;
      $scope.applyFilters();
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

    $scope.getCsvHeader = function() {
      var SAMPLE = 0;
      var rawHeaders = Object.getOwnPropertyNames($scope.scores[SAMPLE]);
      rawHeaders.pop();
      return rawHeaders;
    };

    $scope.getCsvData = function() {
      return $scope.getTableData();
    };

    $scope.getTableData = function() {
      if ($scope.filteredScores.length === $scope.searchedScores.length) {
       return $scope.filteredScores;
      } else {
       return $scope.searchedScores;
      }
    };

    $scope.tableLimit = function() {
      if ($scope.limit) {
        return $scope.limit;
      } else {
        return $scope.scores.length;
      }
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }]);
