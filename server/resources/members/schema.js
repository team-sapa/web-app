var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var memberSchema = new Schema({
    //TODO: IMPLEMENT SCHEMA FOR MEMBER DATA


});






var Members = mongoose.model('members', memberSchema,'members');
module.exports = Members;