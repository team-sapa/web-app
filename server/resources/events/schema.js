var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Member = require('../members/schema');
var ObjectId = mongoose.Schema.Types.ObjectId;

var eventSchema = new Schema({

    eventID: ObjectId,
    name: String,   //Name of event
    date: Date,     //Date of event
    info: String,   //Information for event
    type: String,   //Social, Fundraising, etc. 
    points: Number  //Point value for event
});


var Events = mongoose.model('events', eventSchema, 'events');
module.exports = Events;