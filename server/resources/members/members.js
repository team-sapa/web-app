var mongoose = require('mongoose'),
    Member = require('../members/schema');
let jwt = require('jsonwebtoken');

    //REGISTERS MEMBERS (ADMIN)
    exports.create = (req,res) => {
        console.log(req.body.email);
        console.log("test");
        res.json('nice');
        
    };

    //MEMBER SET PASSWORD
    exports.register = (req, res) => {
    
    };

    /*TODO: 
    *       Authenticate email/password
    *       retrieve member object
    */
    //LOGS IN MEMBERS
    exports.login = (req, res) => {
        //TESTING 
        var member = {
            email: "test@test.com",
            password: "testpass",
            userLevel: 2
        };

        //do stuff here
        
        //create jwt attach to response
        jwt.sign({member}, 'super secret key', (err, token) => {
            res.json({
                token //client will have to store this in local storage
            })
        });
        
    };

    //LIST ALL MEMBERS 
    exports.list = (req, res) => {
        Member.find({}, (err, member)=>{
            if(err){
                console.log(err);
                res.status(404).send(err);
            }
            else
            res.json(member);
            console.log("Member List Retrieved")
        }).sort({code: 1});
    };

    //DISPLAY SINGLE MEMBER'S INFO
    exports.info = (req, res) => {
        res.json(req.member);
    };

    /*TODO: 
    *       update user info once authorized
    *
    */
    //UPDATES SINGLE MEMBER'S INFO (ADMIN/THAT MEMBER)
    exports.update = (req, res) => {
        //check current user level/memberID
        jwt.verify(req.token, 'super secret key', (err, authData) => {
            if(err){
                res.status(403);
            }
            else{
                //ADMIN or THAT MEMBER
                if(authData.member.userLevel >= 2 || authData.member.memberID == req.member.memberID){
                    res.json('Authorized Member');
                }
                else{
                    //res.status()
                    res.json('Unathorized Member');
                }
            }
        });


    };

    //MIDDLEWARE - attatches member object to req based on member(path)
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

    //MIDDLEWARE - attatches member object to req based on registerID(path)
    exports.registerByID = (req, res, next, id) => {
        Member.findOne({registerID: id}, (err, member) => {
            if(err){
                res.status(400).send(err);
            }else{
                req.member = member;
                next();
            }
        });
    };

    //MIDDLEWARE - attatchhes token to the req object
    exports.verifyToken = function(req, res, next){
        //Token Format 
        //Authorization: Bearer <access_token>

        //Get Authorization Header Value
        const bearerHeader = req.headers['authorization'];
        //Check if Bearer is undefined
        if (typeof bearerHeader !== 'undefined'){
            //Extract Token
            console.log('here')
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();

        }
        else{
            res.json("Authorization Error")
        }
    }
