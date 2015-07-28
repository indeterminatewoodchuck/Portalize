var React = require('react');

var UserSignup = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <h2>Sign Up</h2>
          <ul className="form-fields">
            <li>
              <label>First Name</label>
              <input type="text" ref="firstname" onChange={this.handleChange} maxLength="50" />
            </li>
            <li>
              <label>Last Name</label>
              <input type="text" ref="lastname" onChange={this.handleChange} maxLength="50" />
            </li>
            <li>
              <label>Job Title</label>
              <input type="text" ref="jobtitle" onChange={this.handleChange} maxLength="50"/>
            </li>
            <li>
              <label>Email</label>
              <input type="email" ref="email2" onChange={this.handleChange} maxLength="128"/>
            </li>
            <li>
              <label>Password</label>
              <input type="password" ref="password2" onChange={this.handleChange}/>
            </li>
          </ul>
        </div>
      </div>
    )
  },

  handleChange: function(e) {
    e.preventDefault();

    // Get values via this.refs
    var data = {
      firstName : this.refs.firstname.getDOMNode().value,
      lastName  : this.refs.lastname.getDOMNode().value,
      jobTitle  : this.refs.jobtitle.getDOMNode().value,
      email2    : this.refs.email2.getDOMNode().value,
      password2 : this.refs.password2.getDOMNode().value
    }

    this.props.saveValues(data);
  }
});

module.exports = UserSignup;