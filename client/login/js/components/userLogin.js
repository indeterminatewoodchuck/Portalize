var React = require('react');
var helper = require('./helper.js');

var UserLogin = React.createClass({
  render: function() {
    return (
      <div className="form-fields">
        <label>Email</label>
        <input className='shortfield' type="email" ref="email" />
        <span>        </span>
        <label>Password</label>
        <input className='shortfield' type="password" ref="password" />
        <span>        </span>
        <button className='login' onClick={this.handleLogin}>Login</button>
      </div>
    )
  },

  handleLogin: function(e) {
    e.preventDefault();

    var resData = {
      email    : this.refs.email.getDOMNode().value,
      password : this.refs.password.getDOMNode().value
    }

    this.props.saveValues(resData);

    var xmlhttp = helper.makePostRequest("/api/users/signin", resData);
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
         var answer = JSON.parse(xmlhttp.responseText);
         if (answer.success === 'false') {
           _this.props.handleError("userLoginErrorMessage", answer.message);
         }
         else
         {
           window.location.href=window.location.origin;
         }
      }
    }
  }
})

module.exports = UserLogin;
