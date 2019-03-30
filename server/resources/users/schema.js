/* 
This file is now depricated do not use
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.Types.ObjectId;

var usersSchema = new Schema({
  //Login Information
  login: {
    userID: ObjectId, //For linking to attendance and events
    username: String,
    password: String,
    email: String,
    level: Number, //USER LEVEL: 0 - MEMBER 1 - ADMIN 2 - SUPERUSER -- check before routing function
  },
  //Contact Information
  contactInfo: {
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

  //Biographical Information
  bioInfo: {
    officeHours: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String
  },

  points:{
    total: Number
  }
});

var User = mongoose.model('users', usersSchema,'users');
module.exports = User;