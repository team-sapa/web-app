var mongoose = require('mongoose'),
    //jwt = require('jsonwebtoken'),
    Member = require('../members/schema'),
    Event = require('../events/schema'),
    Attendance = require('../attendance/schema');

  



    //LISTS ALL EVENT'S MEMBER RESPONSES
        //list of members for that event
    exports.memberList = (req, res) => {
        
    };

    //CREATES AN ATTENDANCE DOC WHEN MEMBER RESPONDS TO EVENT (THAT MEMBER)
    exports.update = (req, res) => {
        //get event id 
        var eventId = req.event._id;
        var presence = req.body.status;
        var points = req.event.points;
        var penalty = req.event.penalty;
        var current = req.event.current;
        //GET CURRENT LOGGED IN MEMBER
        /*jwt.verify(req.body.token, process.env.secret, (err, authData) => {
            if (err) {
                console.log(err);
                res.status(403);
            }
            else {
                var memberID = (authData.member.userLevel == 1) ? (authData.member.memberID) : (req.event.member);*/
                var memberID = req.body.user;
                var level = req.body.level;

                if (level >= 1) {
                    if (presence == 2) {
                        //remove if excused
                        Attendance.findOneAndRemove({ eventID: eventId, userID: memberID }, function (error, document) {
                            if (error) {
                                //print and send error
                                res.status(404).send(error);
                            } else {
                                Member.findOneAndUpdate({ _id: memberID }, { $inc: { points: (document.present) ? (-points) : (penalty) } }); //TODO: fix these
                                Event.findOneAndUpdate({ _id: eventId }, { current: current - 1 }, { new: true }, function (e, d) {
                                    if (e) {
                                        //print and send error
                                        res.status(404).send(e);
                                    } else {
                                        res.json(d);
                                    }
                                });
                            }
                        });
                    }

                    var att = {
                        eventID: eventId,
                        userID: memberID,
                        present: presence > 0
                    };

                    Attendance.findOneAndUpdate({ eventID: eventId, userID: memberID }, att, function (error, document) {
                        if (error) {
                            res.status(400).send(err);
                        } else {
                            if (document) { //update old
                                Member.findOneAndUpdate({ _id: memberID }, { $inc: { points: (presence > 0) ? (points + penalty) : (-penalty - points) } }); //TODO: fix these
                                Event.findOneAndUpdate({ _id: eventId }, { current: (presence > 0) ? (current + 1) : (current - 1) }, { new: true }, function (e, d) {
                                    if (e) {
                                        //print and send error
                                        res.status(404).send(e);
                                    } else {
                                        res.json(d);
                                    }
                                });
                            } else { //make new if doesn't exist
                                //CREATE ATTENDANCE DOC
                                var attend = new Attendance(att);
                                console.log(attend);
                                //SAVE ATTENDANCE DOC
                                attend.save((err) => {
                                    if (err) {
                                        res.status(400).send(err);
                                    }
                                    else {
                                        //UPDATE MEMBER POINTS AND ADD EVENT TO MEMBER
                                        if (presence > 0) { //present
                                            Member.findOneAndUpdate({ _id: memberID },
                                                { $inc: { points: points } }, //TODO: fix these
                                                { $push: { events: eventId } });
                                            Event.findOneAndUpdate({ _id: eventId }, { current: (current) ? (current + 1) : (1) }, { new: true }, function (e, d) {
                                                if (e) {
                                                    //print and send error
                                                    res.status(404).send(e);
                                                } else {
                                                    res.json(d);
                                                }
                                            });
                                        } else { //absent
                                            Member.findOneAndUpdate({ _id: memberID },
                                                { $inc: { points: -penalty } }, //TODO: fix these
                                                { $push: { absent: eventId } });
                                            Event.findOneAndUpdate({ _id: eventId }, { current: current - 1 }, { new: true }, function (e, d) {
                                                if (e) {
                                                    //print and send error
                                                    res.status(404).send(e);
                                                } else {
                                                    res.json(d);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            /*}
        })*/
        

    };

