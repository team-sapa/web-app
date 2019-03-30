angular.module('main', []).factory('Main', function ($http) {
  var methods = {

    // GET requests
    list: function () {
      return $http.get('/members/');
    },

    info: function (id) {
      return $http.get('/members/:memberID', id);
    },

    // return filtered members based on points
    // retrieve member's event list




    // POST requests
    create: function (email, accessLevel) {
      return $http.post('/members/register', email, accessLevel);
    },

    register: function (password) {
      return $http.post('/members/register/:registerID', password);
    },

    login: function (auth) {
      console.log(auth.email);
      console.log(auth.password);
      return $http.post('/members/login', auth);
    }

    // create event





    // PATCH requests
    // update member's attendance status
    // update member info





    // DELETE requests
    // delete member
    // delete event


  };

  return methods;
});
