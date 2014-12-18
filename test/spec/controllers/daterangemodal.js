'use strict';

describe('Controller: DaterangemodalCtrl', function () {

  // load the controller's module
  beforeEach(module('leadScoreClientApp'));

  var DaterangemodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DaterangemodalCtrl = $controller('DaterangemodalCtrl', {
      $scope: scope
    });
  }));
});
