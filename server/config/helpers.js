module.exports = {

  checkAuth: function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if( token ){
      jwt.verify(token, 'disdasecretyo', function(err, decoded){
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
  },

  errorLogger: function(err, req, res, next){

  },

  errorHandler: function(err, req, res, next){

  }

};
