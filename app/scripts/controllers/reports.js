'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('ReportsCtrl', function ($scope, ProductivityData) {
    $scope.loading = true;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    $scope.renderTable = function (option) {
      if ($scope.loading || !option) return;
      $scope.currentDates = $scope.tableDates[option.value];
      $scope.currentNames = $scope.tableNames[option.value];
      $scope.currentScores = $scope.tableScores[option.value];
    };

    $scope.findCallCount = function (scorer, day) {
      var scoresInDay = $scope.currentScores[day];
      var score = _.findWhere(scoresInDay, { scorer: scorer });
      return (score) ? score.callCount : 0;
    };

    function dataReady(data) {
      $scope.loading = false;
      $scope.dates = _.pluck(data, 'date');
      $scope.monthYears = _.map($scope.dates, function (o) {
        var noDay = _.omit(o, 'day');
        return noDay.month + ',' + noDay.year;
      });
      $scope.options = [];
      $scope.tableDates = [];
      $scope.tableNames = [];
      $scope.tableScores = [];
      $scope.monthYears = _.uniq($scope.monthYears);
      _.forEach($scope.monthYears, function (monthYear) {
        var tokens = monthYear.split(',');
        var month = +tokens[0];
        var year = +tokens[1];
        var monthName = monthNames[month-1];
        var dates = _.filter($scope.dates, {
          'month': month,
          'year': year
        });
        var names = _.filter(data, function (score) {
          return score.date.month === month && score.date.year === year;
        });
        var scores = _.groupBy(names, function (el) {
          return el.date.day;
        });
        names = _.uniq(_.pluck(names, 'scorer'));
        dates = _.sortBy(dates, 'day');
        dates = _.map(dates, function (date) {
          return {
            month: month,
            monthName: monthName,
            day: date.day,
            year: date.year,
          };
        });
        dates = _.uniq(dates, function (date) {
          return JSON.stringify(date);
        });
        $scope.tableDates[monthYear] = dates;
        $scope.tableNames[monthYear] = names;
        $scope.tableScores[monthYear] = scores;
        $scope.options.push({
          label: monthName + ' ' + tokens[1],
          value: monthYear
        });
      });
    };

    ProductivityData.promiseSuccess(dataReady);
  });
