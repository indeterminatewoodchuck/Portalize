var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var apiUtil = require('./apiUtil');

var setEmployeeData = function(data) {
  AppDispatcher.dispatch({
    actionType: appConstants.SET_EMPLOYEE_DATA,
    employeeData: data
  });
};

var appActions = {
  getEmployeeData: function() {
    apiUtil.getEmployeeData()
      .end(function(err, res) {
        if (err) {
          console.log('Error with getEmployeeData: ', err);
          return;
        }
        setEmployeeData(res.body);
      });
  }
};



module.exports = appActions;
