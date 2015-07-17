var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){

  var apiRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../client/dist'));
  app.use('/library', express.static(__dirname + '/../library'));

  app.use('/api', apiRouter);

  require(/*path to where all the api routing is located*/)(apiRouter);
};
