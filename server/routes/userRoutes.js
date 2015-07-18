var userController = require('../controllers/userController.js');

module.exports = function(app){ // app is userRouter injected from middleware.js
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/signuporg', userController.signupworg);
};
