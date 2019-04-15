angular.module('main', []).factory('Main', function ($http, $window) {
  var methods = {


    // get variables through local storage
    getUser: function () {
      var user = localStorage.getItem('user');
      return user;
    },
    getToken: function () {
      var token = localStorage.getItem('token');
      return token;
    },


    // set variables through local storage
    setUser: function (user) {
      $window.localStorage.setItem('user', JSON.stringify(user));
    },
    setToken: function (token) {
      $window.localStorage.setItem('token', JSON.stringify(token));
    },

    // log out (delete token + user)
    logout: function () {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      console.log("logged out");
    },

    // check if currently logged in
    isLoggedIn: function () {
      var token = methods.getToken();
      if (token) {
        return true
      } else {
        return false;
      }
    },


    // GET requests
    list: function () {
      return $http.get('/members/');
    },

    info: function (id) {
      return $http.get('/members/:memberID', id);
    },

    listEvents: function () {
      return $http.get('/events/');
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
      return $http.post('/events/', newEvent);
    },




    // PATCH requests
    update: function (updatedMember) {
      console.log(updatedMember);
      return $http({ method: 'PATCH', url: '/members/' + updatedMember._id, data: updatedMember });
    }

    // update member's attendance status
    // update member info
    // update event info





    // DELETE requests
    // delete member
    // delete event


  };

  return methods;
});
