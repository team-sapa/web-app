var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  config = require('./config');
  users = require('../resources/users/users'),        //REQUIRE ROUTES FOR USERS, MEMBERS, EVENTS
  members = require('../resources/members/members'),
  events = require('../resources/events/events');
  


module.exports.init = function () {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  //Serve static files
  app.use('/', express.static('client'));

  //enable routes/controller for members, events, users
  app.use('/members', members);
  app.use('/users', users);
  app.use('/events', events)

  //Go to homepage for all routes not specified
  app.all('/*', function (req, res) {
    res.sendFile('index.html', { root: 'client' });
  });


  return app;
};