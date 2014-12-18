'use strict';

describe('Controller: DateRangeModalCtrl', function () {

  // load the controller's module
  beforeEach(module('leadScoreClientApp'));

  var DaterangemodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DateRangeModalCtrl = $controller('DateRangeModalCtrl', {
      $scope: scope
    });
  }));
});
