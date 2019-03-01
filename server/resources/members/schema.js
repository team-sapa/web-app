var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var memberSchema = new Schema({
    //TODO: ADD ANY SCHEMA INFO THAT I MISSED
    contactInfo: {
        name: String,
        email: String, 
        phone: String,
        program: String,
        major: String,
        officeHours: String,
    },
    bio: {
        study: String,
        travel: String,
        challenges: String,
        advice: String,
        experience: String
    },
    private: {
        points: Number,
        events: [String],
        userID: Number //to connect to user superuser wouldnt have one
    }
});

var Members = mongoose.model('members', memberSchema,'members');
module.exports = Members;