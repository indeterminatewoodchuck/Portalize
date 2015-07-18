var db = require('../models/index.js');
var jwt = require('jsonwebtoken');

module.exports = {
  signin: function(req, res){
    db.User.findOne({ where: { email: req.body.email } }).then(function(user){
      if( !user ){
        res.json({ success: false, message: 'Authentication failed.' })
      } else {
        user.comparePassword(req.body.password, function(valid){
          if( valid ){
            res.json({ success: false, message: 'Authentication failed.' });
          } else {
            var token = jwt.sign(user, 'disdasecretyo', { expiresInMinutes: 20 });
            res.json({ success: true, message: 'Enjoy your token!', token: token });
          }
        });
      }
    });
  },

  signup: function(req, res){
    // first sign up the organization, THEN sign up the user

    // var username = req.body.username;
    // var password = req.body.password;

    res.send('Thank you for signing up!');

    // if user is in the database
      // call next because the user is already in the database
      // else create the new user and issue a new token
  }
};
