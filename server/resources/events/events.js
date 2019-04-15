var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    async = require('async'),
    Event = require('../events/schema');

    //LIST ALL EVENTS
    exports.list = (req, res) => {
        console.log("test1");
        //console.log(req);
        //res.json("nice1");

        //find all events
        Event.find(function (error, array) {
            if (error) {
                //print and send error
                res.status(404).send(error);
            } else {
                //return array of events
                res.send(array);
            }
        });
    };

    //CREATE NEW EVENT (ADMIN)
    exports.create = (req, res) => {
        console.log("test2");
        //res.json("nice2");

        //check permissions
        /*jwt.verify(req.token, 'super secret key', (err, authData) => {
            //if error or not admin
            if (err || authData.member.userLevel < 2) {
                //send error
                res.status(403);
            }
        });*/

        //create event
        var event = new Event(req.body);

        //save event
        event.save(function (err) {
            if (err) {
                //print and send error
                console.log(err);
                res.status(400).send(err);
            } else {
                //return event
                res.json(event);
            }
        });
    };

    //DISPLAYS SINGLE EVENT'S INFO
    exports.info = (req, res) => {
        //return event
        res.json(req.event);
    };

    //UPDATE SINGLE EVENT'S INFO (ADMIN)
    exports.update = (req, res) => {
        //check permissions
        /*jwt.verify(req.token, 'super secret key', (err, authData) => {
            //if error or not admin
            if (err || authData.member.userLevel < 2) {
                //send error
                res.status(403);
            }
        });*/

        //get event info
        var event = req.event;

        //find and update
        Event.findOneAndUpdate({ _id: event._id }, req.body, function (error, document) {
            if (error) {
                //print and send error
                res.status(404).send(error);
            } else {
                //find updated
                Event.findOne(req.body, function (error2, document2) {
                    if (error2) {
                        //print and send error
                        res.status(404).send(error2);
                    } else {
                        //return updated event
                        res.json(document2);
                    }
                });
            }
        });
    };

//DELETE SINGLE EVENT(ADMIN)
exports.delete = (req, res) => {
    //check permissions
    /*jwt.verify(req.token, 'super secret key', (err, authData) => {
        //if error or not admin
        if (err || authData.member.userLevel < 2) {
            //send error
            res.status(403);
        }
    });*/
    
    //get event info
    var event = req.event;

    //find and update
    Event.findOneAndRemove({ _id: event._id }, function (error, document) {
        if (error) {
            //print and send error
            res.status(404).send(error);
        } else {
            res.json(document);
        }
    });
};

    //MIDDLEWARE TO FIND EVENT
    exports.eventByID = (req, res, next, id) => {
        Event.findById(id).exec((err, event) => {
          if(err) {
            res.status(400).send(err);
          } else {
            req.event = event;
            next();
          }
        });
      };