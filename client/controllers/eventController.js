angular.module('sapaApp').controller('eventController', ['$scope', 'Main',
    function ($scope, Main) {
        $scope.cardsPerRow = 8;
        $scope.query = {};

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
                newEvent.name = '';
                newEvent.date = null;
                newEvent.info = '';
                newEvent.type = '';
                newEvent.points = null;
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
            Main.updateEvent(newEvent).then(function (response) {
                newEvent.name = '';
                newEvent.date = null;
                newEvent.info = '';
                newEvent.type = '';
                newEvent.points = null;
                $scope.selectedEvent = response.data;
                $scope.selectedEvent.date2 = new Date($scope.selectedEvent.date.substring(0, 4), $scope.selectedEvent.date.substring(5, 7) - 1,
                    $scope.selectedEvent.date.substring(8, 10));
                $scope.selectedEvent.date2 = $scope.selectedEvent.date2.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            }, function (error) {
                console.log('Unable to update event:', error);
            })
        }

        $scope.deleteEvent = function (id) {
            Main.deleteEvent(id).then(function (response) {
                $scope.selectedEvent = { name: 'EVENT DELETED' };
            }, function (error) {
                console.log('Unable to delete event:', error);
            })
        }
    }
]);