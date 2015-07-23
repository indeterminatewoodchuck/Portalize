var React = require('react');
var videoChatStore = require('../stores/videoChatStore');
var VideoElement = require('./videoElement.js');

var VideoChat = React.createClass({
  getInitialState: function(){
    return { 
      localStream: null,
      remoteStream: null
    };
  },

  componentDidMount: function(){
    videoChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    videoChatStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      localStream: videoChatStore.getLocalStream(),
      remoteStream: videoChatStore.getRemoteStream()
    });
  },

  render: function(){
    return (
        <div id='remoteStreamVideo'>
          {this.state.remoteStream ? <VideoElement key='remoteStream' value={this.state.remoteStream} size="640" /> : 
          <div></div>}
          <div id='localStreamVideo'>
            {this.state.localStream ? <VideoElement key='localStream' value={this.state.localStream} size="160" /> :
            <div></div>}
          </div>
        </div>
    )
  }
});

module.exports = VideoChat;

// Order of operations in React
// 1. componentWillMount
// 2. render
// 3. componentDidMount
// 4. componentWillReceiveProps is called whenever there is a change to props.
// Used to react to a prop change before render is called
// 5. componentWillUnmount is invoked immediately beore a component is unmounted from the DOM

// document.getElementById(peer.ID).remove();
