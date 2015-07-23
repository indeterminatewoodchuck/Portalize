var React = require('react');
var NavBar = require('./navBar');
var VideoChat = require('./videoChat');
var Queue = require('./queue');
var TextChat = require('./textChat');
var appStore = require('../stores/appStore');
var appActions = require('../actions/appActions');

var Main = React.createClass({

  // Ask server for org name, employee name / ID, other employee info

  getInitialState: function(){
    return appStore.getState();
  },

  componentWillMount: function() {
    this.getEmployeeData();
  },

  componentDidMount: function(){
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    appStore.removeChangeListener(this._onChange);    
  },

  getEmployeeData: function() {
    // Could check local storage first?
    appActions.getEmployeeData();
  },

  _onChange: function() {
    this.setState(appStore.getState());
  },

  render: function() {
    var web_name = this.state.web_name;
    var firstName = this.state.employeeFirstName;
    var lastName = this.state.employeeLastName;
    var email = this.state.employeeEmail;

    return (
      <div className='container'>
        <div className = 'row'>
          <NavBar firstName={firstName} lastName={lastName} email={email} web_name={web_name} />
        </div>
        <div className = 'row'>
          <div className='column1'>
            <VideoChat />
          </div>
          <div className='column2'>
            <Queue web_name={web_name} />
          </div>
        </div>
        <div className = 'row'>
          <TextChat />
        </div>
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
