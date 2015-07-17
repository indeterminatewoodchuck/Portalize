var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express, server, io){
  // var userRouter = express.Router();
  // app.set('secret', 'disdasecretyo');

  app.set('secret', 'disdasecretyo'); // may want to change this later

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.use(express.static(__dirname + '/../../client/dist'));
  app.use('/library', express.static(__dirname + '/../../library'));

  // app.use('/api/users', userRouter);
  // require('../users/userRoutes.js')(userRouter);

  server.socketroute = require('./socketroute.js');
  io.on('connection', function(socket) {
    server.socketroute.socketroute(io, socket);
  });
};
