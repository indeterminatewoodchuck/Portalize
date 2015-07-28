var React = require('react');

var OrgAccountQuery = React.createClass({
  render: function() {
    return (
      <div>
        <table>
          <td><a href='#' className='orgLogin' onClick={this.handleShowOrgLogin}>Join Existing Organization</a></td>  
          <td><a href='#' className='orgSignup' onClick={this.handleShowOrgSignup}>Create Organization</a></td>
        </table>
      </div>
    )
  },

  handleShowOrgLogin: function(event) {
    event.preventDefault();
    this.props.showOrgLogin();
  },

  handleShowOrgSignup: function(event) {
    event.preventDefault();
    this.props.showOrgSignup();
  }
});

module.exports = OrgAccountQuery;
