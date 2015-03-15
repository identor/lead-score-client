'use strict';

describe('Service: ProductivityData', function () {

  // load the service's module
  beforeEach(module('leadScoreClientApp'));

  // instantiate service
  var ProductivityData;
  beforeEach(inject(function (_ProductivityData_) {
    ProductivityData = _ProductivityData_;
  }));

  it('should do something', function () {
    expect(!!ProductivityData).toBe(true);
  });

});
