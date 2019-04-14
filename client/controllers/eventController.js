angular.module('sapaApp').controller('eventController', ['$scope', 'Main',
    function ($scope, Main) {

        // check & set access level/auth token
        $scope.accessLevel = 1;
     
        Main.listEvents().then(function (response) {
            $scope.events = response.data;

            $scope.events.forEach(function (event) {
                event.date2 = new Date(event.date);
            })

            $scope.events.sort(function compareEvents(a, b) {
                return a.date2.getTime() - b.date2.getTime();
            });

            $scope.events.forEach(function (event) {
                event.date2 = event.date2.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            })
        }, function (error) {
            console.log('Unable to retrieve events:', error);
        });

        // return all events
        $scope.list = function () {
            Main.listEvents().then(function (response) {
                $scope.events = response.data;
            }, function (error) {
                console.log('Unable to retrieve events:', error);
            });
        }
    }
]);