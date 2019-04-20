angular.module('sapaApp').controller('adminController', ['$scope', 'Main',
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

    // return filtered members based on points


    // delete member


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
    $scope.create = function (newUser) {
      Main.create(newUser).then(function (response) {
        console.log(response);
        $scope.message = "Member created. Verification email sent.";
      }, function (error) {
        console.log('Unable to create member:', error);
      });
    }

  }
]);