var React = require('react');

var NavBar = React.createClass({

  render: function() {
    return (
      <nav className='navbar navbar-default'>
        <div className='navbar-brand'>Supportal</div>
        <div className='navbar-collapse collapse'>
          <ul className='nav navbar-right'>
            <li>User logged in as: {this.props.firstName} {this.props.lastName}</li>
            <li>{this.props.email}</li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
