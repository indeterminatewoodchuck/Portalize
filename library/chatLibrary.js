var head = document.getElementsByTagName('head')[0];
var socketScript = document.createElement('script');
var icecommScript = document.createElement('script');
socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';
head.appendChild(socketScript);
head.appendChild(icecommScript);

// Client will need to add a button with an ID of 'chat-button' for library to work
var chatButton = document.getElementById('chat-button');

var createChatSession = function() {
  // should we pass in company name or other identifier?
  var comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO');
  var chatWindow = document.createElement('div');
  chatButton.parentNode.appendChild(chatWindow);

  // Change this to our production server url
  var socket = io('http://localhost:3000');
  
  setupVideoChatListeners(comm, chatWindow, data);

  // will need to emit some kind of customer number?
  socket.emit('customerRequest');

  socket.on('customerRoom', function(data) {
    comm.connect(data);
  });
};

var setupVideoChatListeners = function(comm, chatWindow, data){
  comm.on('connected', function(peer) {
    chatWindow.appendChild(peer.getVideo());
  });

  comm.on('local', function(self) {
    chatWindow.appendChild(self.getVideo());
  });

  comm.on('disconnect', function() {
    comm.leave(true);
    chatWindow.remove();
  });
};

chatButton.addEventListener('click', createChatSession, false);
