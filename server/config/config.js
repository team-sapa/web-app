//var env = ('../.env');

module.exports = {
  db: {
    uri: 'mongodb://nick:nicknick123@ds113580.mlab.com:13580/sapa', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};