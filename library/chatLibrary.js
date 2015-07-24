var Supportal = function(orgName){
  this.init();
  this.orgName = orgName;

  // Client will need to add a button and div with these IDs for library to work
  this.chatButton = document.getElementById('supportal-init-button');
  this.chatWindow = document.getElementById('supportal-window');

  // Cached content from business
  this.chatButtonContent = this.chatButton.textContent;

  // Elements to be appended on icecomm connect
  this.localVideo = document.createElement('video');
  this.remoteVideo = document.createElement('video');
  this.textChat = document.createElement('div');

  this.localVideo.autoplay = true;
  this.localVideo.id = 'supportal-local-video';
  this.remoteVideo.autoplay = true;
  this.remoteVideo.id = 'supportal-remote-video';
  this.textChat.id = 'supportal-text-chat';
  this.textChat.innerHTML = '<form>' +
      '<input id="supportal-text-chat-input" type=text placeholder="Type your message here" />' +
      '<input type=submit />' +
    '</form>' +
    '<div id="supportal-message-log"></div>';

  this.chatButton.addEventListener('click', this._initialClickHandler.bind(this), false);
};

Supportal.prototype._initialClickHandler = function(){
  this.renderDetailForm();
  this._changeEventListener('click', this._initialClickHandler, this._cancelClickHandler, 'Cancel');
};

Supportal.prototype._cancelClickHandler = function(){
  this.chatWindow.innerHTML = '';
  this._changeEventListener('click', this._cancelClickHandler, this._initialClickHandler, this.chatButtonContent);
  this.comm.close();
  this.comm.leave(true);
};

Supportal.prototype._changeEventListener = function(eventType, currentHandler, newHandler, textContent){
  this.chatButton.removeEventListener(eventType, currentHandler);
  this.chatButton.textContent = textContent;
  this.chatButton.addEventListener(eventType, newHandler.bind(this));
};

Supportal.prototype.renderDetailForm = function(){
  var form = document.createElement('form');
  form.id = 'supportal-user-detail';

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var userDetails = {
      name: e.target[0].value,
      email: e.target[1].value,
      question: e.target[2].value,
      orgName: this.orgName
    };

    this.createChatSession(userDetails);
    this.chatWindow.removeChild(this.chatWindow.firstChild);

  }.bind(this), false);

  form.innerHTML = '<input placeholder="Name" required /> \
                    <input placeholder="Email" required /> \
                    <input placeholder="Question" required /> \
                    <input type="submit" />';

  this.chatWindow.appendChild(form);

};

Supportal.prototype.init = function(){
  var head = document.getElementsByTagName('head')[0];
  var socketScript = document.createElement('script');
  var icecommScript = document.createElement('script');
  socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
  icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';

  socketScript.onload = function(){
    // need to change io connection point if want to test locally
    this.socket = io('http://6ba84954.ngrok.com');
  }.bind(this);

  icecommScript.onload = function(){
    this.comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO');
  }.bind(this);

  head.appendChild(socketScript);
  head.appendChild(icecommScript);
};

Supportal.prototype.createChatSession = function(userDetails) {
  this.setupPeerConnListeners();
  this.setupSocketListeners();

  // emit 'customerRequest' with orgName passed in on object instantiation
  this.socket.emit('customerRequest', userDetails);
};

Supportal.prototype.setupSocketListeners = function(){

  this.socket.on('staffUnavailable', function(){
    var notAvailable = document.createElement('div');
    notAvailable.innerHTML = 'No staff available right now. Please come back at a later time.';
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(notAvailable);
  }.bind(this));

  this.socket.on('customerQueueStatus', function(position){
    var queueStatus = document.createElement('div');
    queueStatus.innerHTML = 'There are' + position + 'customers ahead of you in the queue.';
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(queueStatus);
  }.bind(this));

  // should we pass in company name or other identifier?
  this.socket.on('customerRoom', function(data) {
    this.comm.connect(data);
  }.bind(this));
};

Supportal.prototype.setupPeerConnListeners = function(){
  // helper function to append message node to supportal-message-log element
  var appendTextMessage = function(user, message) {
    var messageNode = document.createElement('div');
    messageNode.textContent = user + ': ' + message;
    document.getElementById('supportal-message-log').appendChild(messageNode);
  };

  // listener to start peer video stream when a peer connects
  this.comm.on('connected', function(peer) {
    this.chatWindow.appendChild(this.remoteVideo);
    this.remoteVideo.src = peer.stream;
    this.chatWindow.appendChild(this.textChat);

    // after connecting, set up listener for text chat submit
    var submitForm = this.textChat.firstChild;
    var handleSubmit = function(event) {
      var message = event.target[0].value;
      event.preventDefault();
      this.comm.send(message);
      appendTextMessage('customer', message);
      document.getElementById('supportal-text-chat-input').value = '';
    }.bind(this);

    if(submitForm.addEventListener) { // for modern browsers
      submitForm.addEventListener("submit", handleSubmit, false);
    } else if(submitForm.attachEvent) { // for older browsers
      submitForm.attachEvent('onsubmit', handleSubmit);
    }
  }.bind(this));

  // listener to start local video when iceComm gets a room name
  this.comm.on('local', function(self) {
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(this.localVideo);
    this.localVideo.src = self.stream;
  }.bind(this));

  this.comm.on('data', function(message) {
    appendTextMessage('staff', message.data);
  });

  // listener to close video streams and leave room when peer disconnects
  this.comm.on('disconnect', function(peer) {

    // closes audio/video stream
    this.comm.close();

    // remove all children nodes of chatWindow (should just be local)
    this.chatWindow.innerHTML = '';

    var thankYou = document.createElement('div');
    thankYou.innerHTML = 'Thank you for using Supportal.';
    this.chatButton.parentNode.replaceChild(thankYou, this.chatButton);

    // client leaves iceComm room
    this.comm.leave(true);

  }.bind(this));
};
