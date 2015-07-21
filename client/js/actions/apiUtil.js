var request = require('superagent');

var apiUtil = {
  getEmployeeData: function() {
    // Must fix these variables
    var path = '/api/getEmployeeData';
    var token = 'token';

    return request
      .get(path)
      .set('x-access-token', token);
  }
};

module.exports = apiUtil;
