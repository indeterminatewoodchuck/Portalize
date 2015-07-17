var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

module.exports = function(app, express, server, io){
  app.set('secret', 'disdasecretyo');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.use(express.static(__dirname + '/../../client/dist'));
  app.use('/library', express.static(__dirname + '/../../library'));
  // app.get('/login', express.static(__dirname + '/../../login')); // don't protect /login route

  // protect the root route except for library and login/signup
  // app.use(helpers.checkAuth);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  server.socketroute = require('./socketroute.js');
  io.on('connection', function(socket) {
    server.socketroute.socketroute(io, socket);
  });
};
