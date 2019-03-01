var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usersSchema = new Schema({
  username: String,
  password: String,
  email: String,
  level: Number //USER LEVEL: MEMBER ADMIN SUPERUSER -- check before routing function
});

var User = mongoose.model('users', usersSchema,'users');
module.exports = User;