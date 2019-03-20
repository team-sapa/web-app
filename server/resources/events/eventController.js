//get mongoose and event schema
var mongoose = require('mongoose');
var Event = require('./schema.js');

//TO DO: put functions here (look at /server/controllers/listings.server.controller.js on bootcamp 4)
//exports.foo = function(req, res) {}

//creates event and saves it to database
//input is event (req.body)
exports.create = function (req, res) {
    //TO DO: fill this in
}

//deletes event from database
//input is event (req.event)
exports.destroy = function (req, res) {
    //TO DO: fill this in
}

//updates event in database
//input is old event (req.event) and new event (req.body)
exports.update = function (req, res) {
    //TO DO: fill this in
}

//get array containing all events
exports.getAll = function (req, res) {
    //TO DO: fill this in
}