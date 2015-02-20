'use strict';

describe('Controller: ProductivityStatsCtrl', function () {

  // load the controller's module
  beforeEach(module('leadScoreClientApp'));

  var ProductivityStatsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductivityStatsCtrl = $controller('ProductivityStatsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
