angular.module('sapaApp').controller('membersController', function ($scope) {
  $scope.message = 'Everyone come!';
  /* Get all members, then bind it to the scope
  Main.list().then(function (response) {
    $scope.members = response.data;
  }, function (error) {
    console.log('Unable to retrieve members: ', error);
  });
  */

});