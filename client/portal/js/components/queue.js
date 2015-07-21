var React = require('react');
var socketActions = require('../actions/socketActions');

var Queue = React.createClass({
  handleStaffReady: function(){
    var orgName = this.props.orgName;
    socketActions.staffReady(orgName);
  },

  render: function(){
    return (
      <button onClick={ this.handleStaffReady }>This is the queue button</button>
    );
  }

});

module.exports = Queue;
