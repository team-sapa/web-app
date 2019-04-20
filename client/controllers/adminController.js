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


    // remove member
    $scope.removeMember = function (id) {
      Main.removeMember(id).then(function (response) {
        if (response.data.success) {
          console.log(response.data.message);
          window.location.reload();
        }
      }, function (error) {
        console.log('Unable to remove member:', error);
      });
    }

    // update member level
    $scope.updateMemberLevel = function (updatedMember) {
      Main.updateMemberLevel(updatedMember).then(function (response) {
        if (response.data.success) {
          console.log("Member level changed.");
        }
      }, function (error) {
        console.log('Unable to change member level:', error);
      });
    }

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
      if (newUser && newUser.accessLevel && newUser.email) {
        Main.create(newUser).then(function (response) {
          console.log(response);
          $scope.message = "Member created. Verification email sent.";
        }, function (error) {
          console.log('Unable to create member:', error);
        });
      }
      else {
        $scope.message = "Enter an email and privilege level.";
      }
    }

  }
]);