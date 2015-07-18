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


  },

  signupworg: function(req, res){


  }
};
