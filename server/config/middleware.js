var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

module.exports = function(app, express, server, io){

  var userRouter = express.Router(); // user sign-in and user sign-out

  // url encoding, json parser, and terminal logs
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  // unprotected routes
  app.use('/library', express.static(__dirname + '/../../library/chatLibrary.js'));
  app.use('/login', express.static(__dirname + '/../../login'));

  // protect the root path, which is where we will mount our app
  app.use(helpers.checkAuth);
  app.use(express.static(__dirname + '/../../client/dist'));
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  server.socketroute = require('./socketroute.js');
  io.on('connection', function(socket) {
    server.socketroute.socketroute(io, socket);
  });

  app.use('/api/users', userRouter);
  // require('../routes/userRoutes.js')(userRouter);
};
