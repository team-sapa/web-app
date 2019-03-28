angular.module('sapaApp').controller('membersController', ['$scope', 'Main',
  function ($scope, Main) {
    $scope.message = 'member page';

    $scope.list = function () {
      Main.list().then(function (response) {
        $scope.members = response.data;
      }, function (error) {
        console.log('Unable to retrieve members:', error);
      });
    }

  }
]);