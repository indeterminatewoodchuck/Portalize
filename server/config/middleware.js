var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express, server, io){
  // app.set('secret', 'disdasecretyo');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.use(express.static(__dirname + '/../../client/dist'));
  app.use('/library', express.static(__dirname + '/../../library'));

  // protect the root route except for library and login/signup

  server.socketroute = require('./socketroute.js');
  io.on('connection', function(socket) {
    server.socketroute.socketroute(io, socket);
  });
};
