var mongoose = require('mongoose'),
    Attendance = require('../attendance/schema')
    Member = require('../members/schema'),
    Event = require('../events/schema');

  



    //LISTS ALL EVENT'S MEMBER RESPONSES
        //list of members for that event
    exports.memberList = (req, res) => {
        
    };

    //CREATES AN ATTENDANCE DOC WHEN MEMBER RESPONDS TO EVENT (THAT MEMBER)
    exports.create = (req, res) => {
        
        //get event id 
        var eventID = req.event.eventID;
        var points = req.event.points;
        //GET CURRENT LOGGED IN MEMBER
        jwt.verify(req.body.token, process.env.secret, (err, authData) => {
            if(err){
                console.log(err);
                res.status(403);
            }
            else 
                
                if(authData.member.userLevel >= 2){
                    //GET MEMBERID
                    var memberID = authData.member.memberID;
                    //CREATE ATTENDANCE DOC
                    var attend = new Attendance({
                        eventId: eventID,
                        userId: memberID
                    });
                    
                    //SAVE ATTENDANCE DOC
                    attend.save = (err, attend) => {
                        if(err){
                            res.status(400).send(err);
                        }
                        else{
                            //UPDATE MEMBER POINTS AND ADD EVENT TO MEMBER
                            Member.findOneAndUpdate({ "userID" : memberID },
                            { $inc: { "points.total" : points} },
                            { $push: {"events" : eventID} });
                            
                            console.log(attend.eventId);
                        }
                    }
                }
        })
        

    };

