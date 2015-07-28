var React = require('react');
var helper = require('./helper.js');

var Error = React.createClass({
  render: function() {
    return (
      <div>
        <div className='errorView'>Error:  {this.props.errorMessage}</div>
      </div>
    )
  }
});

module.exports = Error;
