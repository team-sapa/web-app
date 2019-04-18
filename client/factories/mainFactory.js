angular.module('main', []).factory('Main', function ($http, $window) {
    function upAtt(event, email) {
        console.log(event);
        console.log(email);
        var user = JSON.parse(localStorage.getItem('user'));
        event.user = user._id;
        event.level = user.level;

        if (email) {
            $http.get('/members/').then(function (response) {
                for (var m = 0; m < response.data.length; ++m) {
                    console.log(response.data[m].email);
                    if (response.data[m].email == email) {
                        event.user = response.data[m]._id;
                        break;
                    }
                }
            }, function (error) {
                console.log('Unable to change attendance:', error);
                return {};
            });
        }
        console.log(event.user);
        return $http.post('/events/' + event._id, event);
    }

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
      return $http.post('/events/', newEvent);
    },

      updateAttend: function (event, email) {
          return upAtt(event, email);
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
        $http.get('/members/').then(function (response) {
            for (var m = 0; m < response.data.length; ++m) {
                if (response.data[m].events.includes(eventID) || response.data[m].absent.includes(eventID)) {
                    upAtt({ _id: $scope.selectedEvent._id, status: 2 }, response.data[m].email);
                }
            }
        }, function (error) {
            console.log('Unable to change attendance:', error);
            return {};
        });

        return $http({ method: 'DELETE', url: '/events/' + eventID, data: eventID });
    }

  };

  return methods;
});
