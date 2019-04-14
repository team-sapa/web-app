angular.module('sapaApp').controller('eventController', ['$scope', 'Main',
    function ($scope, Main) {
        
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
                event.date2 = new Date(event.date.substring(0, 4), event.date.substring(5, 7), event.date.substring(8, 10));
            })

            $scope.events.sort(function compareEvents(a, b) {
                return a.date2.getTime() - b.date2.getTime();
            });

            $scope.events.forEach(function (event) {
                event.date2 = event.date2.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            })
        }

        Main.listEvents().then(reList, function (error) {
            console.log('Unable to retrieve events:', error);
        });

        // create event
        $scope.createEvent = function (newEvent) {
            Main.createEvent(newEvent).then(function (response) {
                console.log(response);
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
            Main.listEvents().then(function (response) {
                $scope.events = response.data;
            }, function (error) {
                console.log('Unable to retrieve events:', error);
            });
        }

        //TODO: delete and update
    }
]);