var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventSchema = new Schema({
    //TODO: IMPLEMENT SCHEMA FOR EVENTS


});






var Events = mongoose.model('members', eventSchema,'events');
module.exports = Events;