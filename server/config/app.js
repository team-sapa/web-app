var express = require('./express');

require('dotenv').config(); // to use env variables

module.exports.start = function () {
  var app = express.init();
  var port = process.env.PORT || process.env.port
  app.listen(port, function () {
    console.log('App listening on port', port);
  });
};