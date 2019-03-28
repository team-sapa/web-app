angular.module('main', []).factory('Main', function ($http) {
  var methods = {

    // GET requests
    list: function () {
      return $http.get('/members/');
    },

    info: function () {
      return $http.get('/members/:memberID');
    },



    // POST requests
    create: function (email, accessLevel) {
      return $http.post('/members/register', email, accessLevel);
    },

    register: function (password) {
      return $http.post('/members/register/:registerID', password);
    },

    login: function (email, password) {
      return $http.post('/members/login', email, password);
    }

  };

  return methods;
});
