'use strict';

/**
 * @ngdoc service
 * @name leadScoreClientApp.ProductivityData
 * @description
 * # ProductivityData
 * Service in the leadScoreClientApp.
 */
angular.module('leadScoreClientApp')
  .service('ProductivityData', function ($http) {
    var scoresRequest = $http.get('/api/score/productivity');
    this.promiseSuccess = scoresRequest.success;
    this.promiseError = scoresRequest.error;
    return this;
  });
