var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    //TODO: ADD ANY SCHEMA INFO I MISSED
    name: String,
    date: Date,
    info: String,
    type: String, //Social, Fundraising, etc. 
    attendance: {
        name: String, //Name of each member
        attend: String, //Present, Absent, or Excused
        excuse: String //request for excuse
    }
});

var Events = mongoose.model('events', eventSchema, 'events');
module.exports = Events;