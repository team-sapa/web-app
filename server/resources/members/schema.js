var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var memberSchema = new Schema({
    //TODO: ADD ANY SHCEMA INFO THAT I MISSED
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
        events: [String]
    }
});

var Members = mongoose.model('members', memberSchema,'members');
module.exports = Members;