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
    getEvent: function () {
      return localStorage.getItem('event');
    },

    // set variables through local storage
    setUser: function (user) {
      $window.localStorage.setItem('user', JSON.stringify(user));
    },
    setToken: function (token) {
      $window.localStorage.setItem('token', JSON.stringify(token));
    },
    setEvent: function (id) {
      $window.localStorage.setItem('event', id);
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

    info: function (member) {
      return $http.get('/members/' + member.id, member);
    },

    listEvents: function () {
      return $http.get('/events/');
    },

    infoEvent: function (id) {
      return $http.get('/events/' + id);
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

      updateAttend: function (event, firstName, lastName) {
          if (firstName && lastName) {
              list().then(function (response) {
                  for (var m = 0; m < response.data.length; ++m) {
                      if (response.data[m].contactInfo.firstName == firstName && response.data[m].contactInfo.lastName == lastName) {
                          break;
                      }
                  }
              }, function (error) {
                  console.log('Unable to change attendance:', error);
              });
          }

          var user = JSON.parse(localStorage.getItem('user'));
          event.user = user._id;
          event.level = user.level;
          return $http.post('/events/' + event._id, event);
      },


    // PATCH requests
    update: function (updatedMember) {
      console.log(updatedMember);
      return $http({ method: 'PATCH', url: '/members/' + updatedMember._id, data: updatedMember });
    },
    
    // update member info

    updateEvent: function (event) {
      return $http({ method: 'PATCH', url: '/events/' + event._id, data: event });
    },



    // DELETE requests
    // delete member
    
    deleteEvent: function (eventID) {
      //TODO: delete attendance objects
      return $http({ method: 'DELETE', url: '/events/' + eventID, data: eventID });
    }

  };

  return methods;
});
