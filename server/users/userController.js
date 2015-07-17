// TODO: require mongoose or whatever we're using
// TODO: possibly use a promise library
var jwt = require('jsonwebtoken');

module.exports = {
  signin: function(req, res, next){ // mongo implementation pending refactor to sequelize
    User.findOne({ name: req.body.name }, function(err, user){
      if( err ) throw err;

      if( !user ){
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if( user ){
        if( user.password != req.body.password ){ // check if the password matches
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          var token = jwt.sign(user, app.get('superSecret'), { // if a user is found and the password is right, create a token
            expiresInMinutes: 1440 // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  },

  signup: function(req, res, next){
    // if user is in the database
      // call next because the user is already in the database
      // else create the new user and issue a new token
  },

  checkAuth: function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if( token ){
      jwt.verify(token, app.get('superSecret'), function(err, decoded){
        if( err ){
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded; // if everything is good, then save to request for use in other routes
          next();
        }
      });
    } else { // if there is no token then return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  }
};
