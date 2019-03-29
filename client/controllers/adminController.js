angular.module('sapaApp').controller('adminController', ['$scope', 'Main',
  function ($scope, Main) {

    // create event


    // return filtered members based on points


    // delete member


    // delete event


    // retrieve member's event list


    // update member's attendance status


    // return all members
    $scope.list = function () {
      Main.list().then(function (response) {
        $scope.members = response.data;
      }, function (error) {
        console.log('Unable to retrieve members:', error);
      });
    }

    // return single member (by id)
    $scope.info = function (id) {
      Main.info(id).then(function (response) {
        $scope.member = response.data;
      }, function (error) {
        console.log('Unable to retrieve member:', error);
      });
    }

    // create a member (ADMIN)
    $scope.create = function (email, accessLevel) {
      Main.create(email, accessLevel).then(function (response) {
        $scope.message = "Member created. Verification email sent.";
      }, function (error) {
        console.log('Unable to create member:', error);
      });
    }

  }
]);