var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var memberSchema = new Schema({
    //Login Information

    userID: ObjectId, //For linking to attendance and events
    email: { type: String, index: { required: true, unique: true, dropDups: true } },
    password: { type: String, required: true },
    level: Number, //USER LEVEL: 0 - MEMBER 1 - ADMIN 2 - SUPERUSER -- check before routing function
    registerID: String,

    //Contact Information
    contactInfo: {
        firstName: String,
        lastName: String,
        birthdate: String,
        active: Boolean,
        email: String,
        phone: String,
        program: [String],
        major: [String],
        minor: [String],
        profileImage: {
            data: Buffer,
            contentType: String
        }
    },

    //Biographical Information
    bioInfo: {
        officeHours: String,
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String
    },

    //Point Information
    points: Number,
    events: [ObjectId] //Stores links to events
});

var Member = mongoose.model('Member', memberSchema);
module.exports = Member;