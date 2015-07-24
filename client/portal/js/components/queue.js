var React = require('react');
var queueStore = require('../stores/queueStore');
var appActions = require('../actions/appActions');
var socketActions = require('../actions/socketActions');

var Queue = React.createClass({
  getInitialState: function() {
    return queueStore.getState();
  },

  componentDidMount: function(){
    queueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    queueStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState(queueStore.getState());
  },

  handleStaffReady: function(){
    var web_name = this.props.web_name;
    socketActions.staffReady(web_name);
    appActions.clearMessages();
  },

  render: function(){
    var customerQueue = this.state.customerQueue;

    var customerCount = <div>There are {customerQueue.length} users in the queue.</div>;

    var queuedCustomers = this.state.customerQueue.map(function(custData, index) {
      return (
        <div key={custData.userId}>
          <div>Customer {index}: {custData.name}</div>
          <div>E-mail Address: {custData.email}</div>
          <div>Help: {custData.question}</div>
        </div>
        );
    });

    return (
      <div className='queue'>
        <div className='queueList'>
          {customerCount}
          {queuedCustomers}
        </div>
        <button className='dequeue' onClick={ this.handleStaffReady }>Chat with next user</button>
      </div>
    );
  }

});

module.exports = Queue;
