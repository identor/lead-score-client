'use strict';

/**
 * @ngdoc overview
 * @name leadScoreClientApp
 * @description
 * # leadScoreClientApp
 *
 * Main module of the application.
 */
angular
  .module('leadScoreClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mm.foundation',
    'ngCsv'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/scores.html',
        controller: 'ScoresCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
