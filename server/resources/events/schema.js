var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ObjectId = mongoose.Schema.Types.ObjectId;

var eventSchema = new Schema({
    name: String,   //Name of event
    date: Date,     //Date of event
    info: String,   //Information for event
    type: String,   //Social, Fundraising, etc. 
    points: Number, //Point value for event
    //attendanceID: ObjectId //Link to attendance object - this isnt needed
});

var Events = mongoose.model('events', eventSchema, 'events');
module.exports = Events;