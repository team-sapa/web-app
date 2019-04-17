var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var attendanceSchema = new Schema({
    //To link to event
    eventID: ObjectId,
    //To link to user
    userID: ObjectId,
    //true = present, false = absent
    present: Boolean
});

var Attendance = mongoose.model('attendance', attendanceSchema, 'attendance');
module.exports = Attendance;