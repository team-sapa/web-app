var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  //users = require('../resources/users/users'),        //REQUIRE ROUTES FOR USERS, MEMBERS, EVENTS
  //members = require('../resources/members/routes');
  //events = require('../resources/events/router'),
  //attendance = require('../resources/attendance/router');
  memberRouter = require('../resources/members/routes'),
  eventRouter = require('../resources/events/routes');

  require('dotenv').config(); // to use env variables


module.exports.init = function () {
  //connect to database
  mongoose.connect(process.env.db_uri).then(
    () => {
      console.log("\nConnected to MLAB\n");
    },
    err => {
      console.log("\nERROR connecting to MLAB: " + err);
    }
  );

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  //Serve static files
  app.use('/', express.static('client'));

  //TODO CHECK IF THIS WORKS
  app.use('/members', memberRouter);
  app.use('/events', eventRouter);

  //Go to homepage for all routes not specified
  app.all('/*', function (req, res) {
    res.sendFile('index.html', { root: 'client' });
  });


  return app;
};