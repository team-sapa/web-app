var event = require('../events/events'), 
    attendance = require('../attendance/attendance.js'),
    member = require('../members/members.js'),
    express = require('express'), 
    router = express.Router();


router.route('/')
    .get(event.list)        //displays all events
    .post(event.create);     //allow admins to create events (memberlevel high enough)

router.route('/:eventID')
    .get(event.info)            //displays this events info
    .patch(event.update)        //allows admins to update events (memberlevel high enough)
    .post(attendance.create)    //creates attendance doc for this member w/ their status 
    .get(attendance.memberList); //displays this events attendance list


//Middleware to pass eventID to the route
router.param('eventID', event.eventByID);

module.exports = router;