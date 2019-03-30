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
    create: function (newUser) {
      console.log(newUser);
      return $http.post('/members/register', newUser);
    },

    register: function (newUser) {
      console.log(newUser);
      return $http.post('/members' + newUser.registrationURL, newUser);
    },

    login: function (auth) {
      console.log(auth);
      return $http.post('/members/login', auth);
    },

    createEvent: function (newEvent) {
        console.log(newEvent);
        return $http.post('/events', newEvent);
      }




    // PATCH requests
    // update member's attendance status
    // update member info





    // DELETE requests
    // delete member
    // delete event


  };

  return methods;
});
