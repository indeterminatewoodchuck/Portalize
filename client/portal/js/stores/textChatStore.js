var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _messages = [];

// I DON'T THINK THIS addMessage IS USED ANYWHERE
var addMessage = function(message) {
  _messages.push(message);
};

var clearMessages = function() {
  _messages = [];
};

var textChatStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE, cb);
  },
  getMessages: function() {
    return _messages;
  }
});

AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.CLEAR_MESSAGES) {
    clearMessages();
    textChatStore.emit(CHANGE);
  }
});

textChatStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.SEND_TEXT_MESSAGE) {
    _messages.push([payload.user, payload.message]);
    textChatStore.emit(CHANGE);
  }
  else if (payload.actionType === appConstants.CLEAR_MESSAGES) {
    clearMessages();
    textChatStore.emit(CHANGE);
  }
  return true;
});

module.exports = textChatStore;