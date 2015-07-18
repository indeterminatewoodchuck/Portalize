// TODO: require mongoose or whatever we're using
// require a db, will use the db variable name for now
var jwt = require('jsonwebtoken');

module.exports = {
  signin: function(req, res, next){ // mongo implementation pending refactor to sequelize
    // User.findOne({ name: req.body.name }, function(err, user){
    //   if( err ) throw err;
    //
    //   if( !user ){
    //     res.json({ success: false, message: 'Authentication failed. User not found.' });
    //   } else if( user ){
    //     if( user.password !== req.body.password ){ // check if the password matches
    //       res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    //     } else {
    //       var token = jwt.sign(user, 'disdasecretyo', { // if a user is found and the password is right, create a token
    //         expiresInMinutes: 1440 // expires in 24 hours
    //       });
    //
    //       res.json({
    //         success: true,
    //         message: 'Enjoy your token!',
    //         token: token
    //       });
    //     }
    //   }
    // });

    res.send('Thank you for signing in!');
  },

  signup: function(req, res, next){
    // first sign up the organization, THEN sign up the user

    // var username = req.body.username;
    // var password = req.body.password;

    res.send('Thank you for signing up!');

    // if user is in the database
      // call next because the user is already in the database
      // else create the new user and issue a new token
  }
};
