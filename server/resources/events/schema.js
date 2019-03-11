var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  //TODO: ADD ANY SCHEMA INFO I MISSED
  name: String,
  date: Date,
  info: String
});

var Events = mongoose.model('events', eventSchema, 'events');
module.exports = Events;