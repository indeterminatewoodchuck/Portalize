var React = require('react');
var helper = require('./helper.js');

var OrgSignup = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <h2>Create Organization</h2>
          <ul className="form-fields">
            <li>
              <label>Business Name</label>
              <input type="text" ref="businessname2" />
            </li>
            <li>
              <label>Address</label>
              <input type="text" ref="address" />
            </li>
            <li>
              <label>City</label>
              <input type="text" ref="city" />
            </li>
            <li>
              <label>State</label>
              <input type="text" ref="state" />
            </li>
            <li>
              <label>Zip</label>
              <input type="text" ref="zip" />
            </li>
            <li>
              <label>Country</label>
              <input type="text" ref="country" />
            </li>
            <li>
              <label>Industry</label>
              <input type="text" ref="industry" />
            </li>
            <li>
              <label>Password</label>
              <input type="password" ref="businesspassword2" />
            </li>
            <li className="form-footer">
              <button onClick={this.signup}>Create Account and Organization</button>
            </li>
          </ul>
        </div>
      </div>
    )
  },

  signup: function(e) {
    e.preventDefault()

    var field = this.props.fieldValues;
    var resData = {
      firstName        : field.firstName,
      lastName         : field.lastName,
      jobTitle         : field.jobTitle,
      email            : field.email2,
      password         : field.password2,
      businessName     : this.refs.businessname2.getDOMNode().value,
      businessPassword : this.refs.businesspassword2.getDOMNode().value,
      address          : this.refs.address.getDOMNode().value,
      city             : this.refs.city.getDOMNode().value,
      state            : this.refs.state.getDOMNode().value,
      zip              : this.refs.zip.getDOMNode().value,
      country          : this.refs.country.getDOMNode().value,
      industry         : this.refs.industry.getDOMNode().value
    }

    var _this = this;
    if (helper.userDataValid(resData, function(message) {
      _this.props.handleError("orgSignupErrorMessage", message);
    })) {
      var xmlhttp = helper.makePostRequest("/api/users/signupwithorg", resData);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           var answer = JSON.parse(xmlhttp.responseText);
           if (answer.success === 'false') {
             _this.props.handleError("orgSignupErrorMessage", answer.message);
           }
           else
           {
             window.location.href=window.location.origin;
           }
        }
      }
    }
  }
});

module.exports = OrgSignup;
