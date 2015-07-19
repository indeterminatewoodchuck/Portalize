var db = require('../models/index.js');
var jwt = require('jsonwebtoken');

module.exports = {
  signin: function(req, res){
    db.User.findOne({ where: { email: req.body.email } }).then(function(user){
      if( !user ){
        res.json({ success: false, message: 'Invalid username.' });
      } else {
        user.checkPassword(req.body.password, function(valid){
          if( valid ){
            res.json({ success: false, message: 'Invalid password.' });
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
              var token = jwt.sign(newUser, 'disdasecretyo', { expiresInMinutes: 20 });
              res.json({ success: true, message: 'Enjoy your token!', token: token });
            });
          });
        }
      });
    });
  },

  signupwithorg: function(req, res){
    db.Organization.findOne({ where: { name: req.body.businessName } }).then(function(org){
      if( org ){ res.json({ success: false, message: 'Organization already exists.' }); }
      db.User.findOne({ where: { email: req.body.email } }).then(function(user){
        if( user ){ res.json({ success: false, message: 'User already exists.' }); }
        db.Organization.build({
          name: req.body.businessName,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          country: req.body.country,
          industry: req.body.industry,
          password_hash: req.body.businessPassword
        }).save().then(function(newOrg){
          db.User.build({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            OrganizationID: newOrg.id,
            title: req.body.jobTitle,
            email: req.body.email,
            password_hash: req.body.password
          }).save().then(function(newUser){
            var token = jwt.sign(newUser, 'disdasecretyo', { expiresInMinutes: 20 });
            res.json({ success: true, message: 'Enjoy your token!', token: token });
          });
        });
      });
    });
  }
};
