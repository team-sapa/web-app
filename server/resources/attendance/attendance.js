var mongoose = require('mongoose'),
    Attendance = require('../attendance/schema')
    Member = require('../members/schema'),
    Event = require('../events/schema');

    //LISTS ALL MEMBER'S EVENT RESPONSES
        //list of events for that member
    exports.eventList = (req, res) => {
        
    };

    //UPDATES MEMBER'S EVENT RESPONSE (THAT MEMBER/ADMIN)
    exports.update = (req, res) => {
    
    };

    //LISTS ALL EVENT'S MEMBER RESPONSES
        //list of members for that event
    exports.memberList = (req, res) => {

    };

    //CREATES AN ATTENDANCE DOC WHEN MEMBER RESPONDS TO EVENT (THAT MEMBER)
    exports.create = (req, res) => {
        console.log("att test");
        res.json("att nice");
    };

//Need middleware for getting the current logged in members ID