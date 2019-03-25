var env = ('../.env');

module.exports = {
  db: {
    uri: db, //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};