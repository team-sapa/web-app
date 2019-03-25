var mongoose = require('mongoose'),
    Member = require('../members/schema');

    //REGISTERS MEMBERS (ADMIN)
    exports.register = (req,res) => {
        //check current user level
        //if admin allow registration
        //hash password
        //create member
        
    };

    //LOGS IN MEMBERS
    exports.login = (req, res) => {
        //validate email/password
        //jwt
        //login
    };

    //LIST ALL MEMBERS 
    exports.list = (req, res) => {
        //list all members
    };

    //DISPLAY SINGLE MEMBER'S INFO
    exports.info = (req, res) => {
        //display specific member
    };

    //UPDATES SINGLE MEMBER'S INFO (ADMIN/THAT MEMBER)
    exports.update = (req, res) => {
        //check current user level/memberID
        //if user level high enough or currentID is the memberID
        //update information
    };

    //Might have to change this so it find the memberID instead
    //of mongooses generated ID
    exports.memberByID = function(req, res, next, id) {
        Member.findById(id).exec(function(err, member) {
          if(err) {
            res.status(400).send(err);
          } else {
            req.member = member;
            next();
          }
        });
      };