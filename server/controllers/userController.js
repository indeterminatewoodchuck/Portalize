var db = require('../models/index.js');
var jwt = require('jsonwebtoken');

module.exports = {
  signin: function(req, res){
    db.User.findOne({ where: { email: req.body.email } }).then(function(user){
      if( !user ){
        res.json({ success: false, message: 'Authentication failed.' })
      } else {
        user.checkPassword(req.body.password, function(valid){
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
    db.Organization.findOne({ where: { name: req.body.businessName } }).then(function(org){
      if( !org ){ res.json({ success: false, message: 'Organization does not exist.' }); }
      org.checkPassword(req.body.businessPassword, function(valid){
        if( !valid ){ res.json({ success: false, message: 'Wrong organization password.' }); }
        else {
          db.User.findOne({ where: { email: req.body.email } }).then(function(user){
            if( user ){ res.json({ success: false, message: 'User already exists.' }); }
            db.User.build({
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              OrganizationID: org.id,
              title: req.body.jobTitle,
              email: req.body.email,
              password_hash: req.body.password
            }).save().then(function(newUser){
              var token = jwt.sign(user, 'disdasecretyo', { expiresInMinutes: 20 });
              res.json({ success: true, message: 'Enjoy your token!', token: token });
            });
          });
        }
      });
    });
  },

  signupworg: function(req, res){


  }
};
