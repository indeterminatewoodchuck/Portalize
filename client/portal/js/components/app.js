var React = require('react');
var NavBar = require('./navBar');
var VideoChat = require('./videoChat');
var Queue = require('./queue');
var TextChat = require('./textChat');
var ChatInterface = require('./chatInterface');
var appStore = require('../stores/appStore');
var appActions = require('../actions/appActions');
var Router = require('react-router');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

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
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={Main}>
    <Route path="interface" handler={ChatInterface}/>
  </Route>
);


Router.run(routes, function(Root) {
  React.render(<Root/>, document.getElementById('app'));
});
