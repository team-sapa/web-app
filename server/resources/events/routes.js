var event = require('../events/events'), 
    attendance = require('../attendance/attendance.js'),
    member = require('../members/members.js'),
    express = require('express'), 
    router = express.Router();


router.route('/')
    .get(event.list)        //displays all events
    .post(event.create);     //allow admins to create events (memberlevel high enough)

router.route('/:eventID')
<<<<<<< HEAD
    .get(event.info)                                //displays this events info
    .patch(member.verifyToken, event.update)        //allows admins to update events (memberlevel high enough)
    .post(member.verifyToken, attendance.create)    //creates attendance doc for this member w/ their status (update points here?) 
=======
    .get(event.info, attendance.memberList)            //displays this events info
    .patch(/*member.verifyToken, */event.update)        //allows admins to update events (memberlevel high enough)
    .post(/*member.verifyToken, */attendance.create)    //creates attendance doc for this member w/ their status (update points here?) 
    .delete(/*member.verifyToken, */event.delete)       //allows admin to delete events (memberlevel high enough)
>>>>>>> 8976a5f13d894cf913bb379ec825d3d7ebf50c4f
    //.get(attendance.memberList); //displays this events attendance list


//Middleware to pass eventID to the route
router.param('eventID', event.eventByID);

module.exports = router;