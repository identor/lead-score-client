'use strict';

/* global $:true */

/**
 * @ngdoc directive
 * @name leadScoreClientApp.directive:foundationDatePicker
 * @description
 * # foundationDatePicker
 */
angular.module('leadScoreClientApp')
  .directive('foundationDatePicker', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function postLink(scope, element, attrs, model) {
        $(element).fdatepicker()
          .on('update', function(value) {
            model = value;
          });
      }
    };
  });
