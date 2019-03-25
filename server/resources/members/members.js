var Member = require('../members/schema'),
    bcrypt = require('bcrypt'),
    nodemailer = require('nodemailer'),
    crypto = require('crypto'),
    async = require('async'),
    jwt = require('jsonwebtoken');
    BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

    require('dotenv').config();

    //CREATES A MEMBER (ADMIN)    TODO: Check if member with email already exists
    exports.create = (req,res) => {
      let email = req.body.email;
      let accessLevel = req.body.accessLevel;
      console.log(email);
      console.log(accessLevel);

      async.waterfall([
          function (callback) {
              // generate token
              crypto.randomBytes(20, function (err, buf) {
                  var token = buf.toString('hex');
                  if (err) {
                    res.json({
                      success: false,
                      message: err,
                    });
                  }
                  console.log("Token Generated");
                  callback(null, token);
              });
          },
          function (token, callback) {
              // create member with registrationToken
              let member = new Member({
                  password: token,
                  email: email,
                  level: accessLevel
              });
              member.save((err) => {
                  if (err) {
                      console.log(err);
                      res.json({
                        success: false,
                        message: err,
                      });
                  }
                  console.log("Member Created: " + member.email);
                  callback(null, member, token);
              });
          },
          function (member, token, callback) {
              // send email with registrationToken url
              if(member){
                var smtpTrans = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                      user: process.env.google_user,
                      pass: process.env.google_pass
                  }
                });
                var mailOptions = {
                    to: member.email,
                    from: 'UF SAPA',
                    subject: 'Register for your UF SAPA account',
                    text: 'Welcome to UF SAPA.\n\n' +
                        'Please click on the following link to complete the registration process:\n\n' +
                        'http://' + req.hostname + '/members/register/' + token + '\n\n'
                };
                smtpTrans.sendMail(mailOptions, function (err) {
                    if (err) {
                      res.json({
                        success: false,
                        message: err,
                      });
                    }
                    console.log("Email Sent");
                    callback(null);
                });
              }
          }
      ], function () {
          console.log('Member successfully created.');
          res.json({
            success: true,
            message: 'Member successfully created.',
          });
      });

    };

    //REGISTERS MEMBER USING EMAILED LINK
    exports.register = (req, res) => {
      let registerToken = req.params.registerToken;
      let password = req.body.password;

      async.waterfall([
          function (callback) {
              // find member with registrationToken
              Member.findOne({ password: registerToken }, function (err, member, next) {
                  if (!member) {
                      console.log("Registration token is invalid.");
                      res.end('Registration token is invalid.');
                  }
                  // update member
                  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
                      .then(hash => {

                          member.password = hash;

                          member.save(function (err) {
                              if (err) {
                                res.json({
                                  success: false,
                                  message: err,
                                });
                              }
                              console.log("Member Password Set");
                              callback(null, member)
                          });
                      });
              });
          },
          function (member, callback) {
              // send verification email
              var smtpTrans = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                    user: process.env.google_user,
                    pass: process.env.google_pass
                  }
              });
              var mailOptions = {
                  to: member.email,
                  from: 'myemail',
                  subject: 'Your UF SAPA Account is now complete!',
                  text: 'Hello ' + member.email + ',\n\n' +
                      'This is a confirmation that your UF SAPA Account has been created.\n\n' +
                      'You can now log in at ' + 'http://' + req.hostname + '/login'
              };
              smtpTrans.sendMail(mailOptions, function (err) {
                  if (err) {
                      res.json({
                        success: false,
                        message: err,
                      });
                  }
                  console.log("Email Sent");
                  callback(null);
              });
          }
      ], function () {
          console.log('Member password successfully set.');
          res.json({
            success: true,
            message: 'Member password successfully set.',
          });
      });
  };

    //LOGS IN MEMBERS   ->  Returns JWT on a successful login
    exports.login = (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        Member.find({ email: email })
            .then(member => {
                if (member)
                    return bcrypt.compare(password, member[0].password);
            })
            .then(passwordMatch => {
                if (!passwordMatch) {
                  res.send(400).json({
                    success: false,
                    message: 'Password is invalid!'
                  });
                }
                let token = jwt.sign({email: email},
                  process.env.secret,
                  { expiresIn: '24h' // expires in 24 hours
                  }
                );
                // return the JWT token
                res.json({
                  success: true,
                  message: 'Authentication successful!',
                  token: token
                });
            })
            .catch(err => {
                console.log(err);
                res.end(err);
            })
    };

    //LIST ALL MEMBERS
    exports.list = (req, res) => {
        //list all members
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
        //display specific member
        res.json(req.member);
    };

    //UPDATES SINGLE MEMBER'S INFO (ADMIN/THAT MEMBER)
    exports.update = (req, res) => {
        //check current user level/memberID
        //if user level high enough or currentID is the memberID
        //update information


        /*
            Verify JWT Token:

            jwt.verify(token, process.env.secret, (err, decoded) => {
              if (err) {
                return res.json({
                  success: false,
                  message: 'Token is not valid'
                });
              } else {
                //PROCEED
              }
            });
        */

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