'use strict';

describe('Controller: ReportsCtrl', function () {

  // load the controller's module
  beforeEach(module('leadScoreClientApp'));

  var ReportsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsCtrl = $controller('ReportsCtrl', {
      $scope: scope
    });
  }));
});
