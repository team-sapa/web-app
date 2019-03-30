var express = require('./express');

require('dotenv').config(); // to use env variables

module.exports.start = function () {
  var app = express.init();
  app.listen(process.env.port, function () {
    console.log('App listening on port', process.env.port);
  });
};