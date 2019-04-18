angular.module('sapaApp').controller('eventController', ['$scope', 'Main',
    function ($scope, Main) {
        $scope.cardsPerRow = 8;
        $scope.query = {};
        $scope.newEvent = {};

        // check & set access level/auth token
        if (Main.isLoggedIn()) {
            var token = JSON.parse(Main.getToken());
            $scope.token = token
            var user = JSON.parse(Main.getUser());
            $scope.user = user;
            $scope.accessLevel = user.level;
        }
        else {
            $scope.accessLevel = 0;
            console.log("not authenticated");
        }

        function reList(response) {
            $scope.events = response.data;
            
            $scope.events.forEach(function (event) {
                event.date2 = new Date(event.date.substring(0, 4), event.date.substring(5, 7) - 1, event.date.substring(8, 10));
            })

            $scope.events.sort(function compareEvents(a, b) {
                return a.date2.getTime() - b.date2.getTime();
            });

            $scope.events.forEach(function (event) {
                event.date2 = event.date2.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            })

            $scope.filter();
        }

        function fitsFilter(event) {
            return !$scope.query.text || event.name.toUpperCase().includes($scope.query.text.toUpperCase())
                || event.points.toString().toUpperCase().includes($scope.query.text.toUpperCase()) || event.date2.toUpperCase().includes($scope.query.text.toUpperCase());
        }

        function clearFields() {
            $scope.newEvent.name = '';
            $scope.newEvent.date = null;
            $scope.newEvent.info = '';
            $scope.newEvent.type = '';
            $scope.newEvent.points = null;
            $scope.newEvent.penalty = null;
            $scope.newEvent.max = null;
            email = null;
        }
        
        Main.infoEvent(Main.getEvent()).then(function (response) {
            $scope.selectedEvent = response.data;
            $scope.selectedEvent.date2 = new Date($scope.selectedEvent.date.substring(0, 4), $scope.selectedEvent.date.substring(5, 7) - 1,
                $scope.selectedEvent.date.substring(8, 10));
            $scope.selectedEvent.date2 = $scope.selectedEvent.date2.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        }, function (error) {
            console.log('Unable to get event:', error);
        })

        Main.listEvents().then(reList, function (error) {
            console.log('Unable to retrieve events:', error);
        });

        // filter events
        $scope.filter = function () {
            var counter = 0;
            $scope.events2D = [];

            for (var i = 0; i < $scope.events.length; ++i) {
                if (fitsFilter($scope.events[i])) {
                    if (counter % 8 == 0) {
                        $scope.events2D.push([]);
                    }

                    $scope.events2D[Math.floor(counter / 8)].push($scope.events[i]);
                    counter++;
                }
            }
        }

        $scope.showInfo = function (event) {
            Main.setEvent(event._id);
            window.location.href = '/#/event';
        }

        // create event
        $scope.createEvent = function (newEvent) {
            Main.createEvent(newEvent).then(function (response) {
                Main.listEvents().then(reList, function (error) {
                    console.log('Unable to retrieve events:', error);
                });
                clearFields();
            }, function (error) {
                console.log('Unable to create event:', error);
            })
        }

        // return all events
        $scope.list = function () {
            Main.listEvents().then(reList, function (error) {
                console.log('Unable to retrieve events:', error);
            });
        }

        $scope.updateEvent = function (newEvent) {
            newEvent._id = $scope.selectedEvent._id;
            newEvent.name = (newEvent.name) ? (newEvent.name) : ($scope.selectedEvent.name);
            newEvent.date = (newEvent.date) ? (newEvent.date) : ($scope.selectedEvent.date);
            newEvent.info = (newEvent.info) ? (newEvent.info) : ($scope.selectedEvent.info);
            newEvent.type = (newEvent.type) ? (newEvent.type) : ($scope.selectedEvent.type);
            newEvent.points = (newEvent.points != null) ? (newEvent.points) : ($scope.selectedEvent.points);
            newEvent.penalty = (newEvent.penalty != null) ? (newEvent.penalty) : ($scope.selectedEvent.penalty);
            newEvent.max = (newEvent.max != null) ? (newEvent.max) : ($scope.selectedEvent.max);
            Main.updateEvent(newEvent).then(function (response) {
                clearFields();
                $scope.selectedEvent = response.data;
                $scope.selectedEvent.date2 = new Date($scope.selectedEvent.date.substring(0, 4), $scope.selectedEvent.date.substring(5, 7) - 1,
                    $scope.selectedEvent.date.substring(8, 10));
                $scope.selectedEvent.date2 = $scope.selectedEvent.date2.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            }, function (error) {
                console.log('Unable to update event:', error);
            })
        }

        $scope.deleteEvent = function (id) {
            Main.deleteEvent(id, $scope.selectedEvent).then(function (response) {
                $scope.selectedEvent = { name: 'EVENT DELETED' };
            }, function (error) {
                console.log('Unable to delete event:', error);
            })
        }

        $scope.signUp = function (stats, email) {
            if ($scope.accessLevel < 2 && Date.now() > (new Date($scope.selectedEvent.date)).getMilliseconds()) {
                $scope.message = 'too late to sign up';
                return;
            }

            if ($scope.selectedEvent.current >= $scope.selectedEvent.max && $scope.selectedEvent.max > 0 && stats == 1) {
                $scope.message = 'event is full';
                return;
            }

            Main.updateAttend({ _id: $scope.selectedEvent._id, status: stats }, email).then(function (response) {
                $scope.message = (stats == 0) ? ('absent') : ((stats == 1) ? ('present') : ('excused'));
                $scope.selectedEvent = response.data;
                clearFields();
            }, function (error) {
                console.log('Unable to change attendance:', error);
            })
        }
    }
]);