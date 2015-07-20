if (process.env.PORT === undefined) {
  require('dotenv').load();
}

var app = require('./server/server.js');

var port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
