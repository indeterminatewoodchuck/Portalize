var React = require('react');
var helper = require('./helper.js');

var OrgLogin = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Join Existing Organization</h2>
        <ul className="form-fields">
            <label>Business Name</label>
            <input type="text" ref="businessname" />
            <label>Password</label>
            <input type="password" ref="businesspassword" />
            <button onClick={this.handleLogin}>Create Account</button>
        </ul>
      </div>
    )
  },

  handleLogin: function(e) {
    e.preventDefault();
    this.props.clearErrors();
    var field = this.props.fieldValues;
    var resData = {
      firstName        : field.firstName,
      lastName         : field.lastName,
      jobTitle         : field.jobTitle,
      email            : field.email2,
      password         : field.password2,
      businessName     : this.refs.businessname.getDOMNode().value,
      businessPassword : this.refs.businesspassword.getDOMNode().value
    }

    var _this = this;
    if (helper.userDataValid(resData, function(message) {
      _this.props.handleError("orgLoginErrorMessage", message);
    })) {
      var xmlhttp = helper.makePostRequest("/api/users/signup", resData);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           var answer = JSON.parse(xmlhttp.responseText);
           if (answer.success === 'false') {
             _this.props.handleError("orgLoginErrorMessage", answer.message);
           }
           else
           {
             window.location.href=window.location.origin;
           }
        }
      }
    }
  }
})

module.exports = OrgLogin;
