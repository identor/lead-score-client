'use strict';

describe('Controller: ScoresCtrl', function () {

  // load the controller's module
  beforeEach(module('leadScoreClientApp'));

  var ScoresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScoresCtrl = $controller('ScoresCtrl', {
      $scope: scope
    });
  }));
});
