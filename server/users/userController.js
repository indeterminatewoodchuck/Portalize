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
          var token = jwt.sign(user, app.get('secret'), { // if a user is found and the password is right, create a token
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
  }
};
