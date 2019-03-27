var mongoose = require('mongoose'),
    Event = require('../events/schema');

    //LIST ALL EVENTS
    exports.list = (req, res) => {
        console.log("test1")
        console.log(req);
        res.json("nice1")
    };

    //CREATE NEW EVENT (ADMIN)
    exports.create = (req, res) => {
    //    console.log("test2");
    //    res.json("nice2");

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
    
    };

    //UPDATE SINGLE EVENT'S INFO (ADMIN)
    exports.update = (req, res) => {

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