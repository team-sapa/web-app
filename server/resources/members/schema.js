var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.Types.ObjectId;

var memberSchema = new Schema({
    //TODO: ADD ANY SCHEMA INFO THAT I MISSED
    contactInfo: {
        userID: ObjectID, //For linking member data to user
        username: String,
        firstName: String,
        lastName: String,
        birthdate: String,
        active: Boolean,
        email: String, 
        phone: String,
        program: String,
        country: String,
        major1: String,
        major2: String,
        minor1: String,
        minor2: String,
       
    },
    bio: {
        officeHours: String,
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String
    },
    points: {
        //Updated based on rsvp or an executive 
        social: Number,
        infoSession: Number,
        fundraiser: Number,
        outreach: Number,
        emailOutreach: Number,
        miscellanous: Number,
        missed: Number, 
        deduction: Number,
        officeHour: Number,
        total: Number,
        required: Number
    },
    events: {
        //updated when a member rsvps to event
        socialEvents: [String],
        infoSessions: [String],
        fundraisers: [String],
        emailOutreach: [String],
        misc: [String],           
        missedEvents: [String], //Updated when a member doesnt rsvp 
        deductionReason: [String], 
        officeHours: [String]
    }
});

var Members = mongoose.model('members', memberSchema,'members');
module.exports = Members;