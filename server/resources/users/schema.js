var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.Types.ObjectId;

var usersSchema = new Schema({
  memberID: ObjectID, //For linking users to their memeber data
  username: String,
  password: String,
  email: String,
  level: Number //USER LEVEL: MEMBER ADMIN SUPERUSER -- check before routing function

});

var User = mongoose.model('users', usersSchema,'users');
module.exports = User;