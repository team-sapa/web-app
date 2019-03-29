angular.module('sapaApp').controller('mainController', ['$scope', 'Main',
  function ($scope, Main) {



    // update member info


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

    // register a member (member using registration link)
    $scope.register = function (password) {
      Main.register(password).then(function (response) {
        if (response.data.success)
          $scope.message = "You are now verified.";
      }, function (error) {
        console.log('Unable to register member:', error);
      });
    }

    // login a member
    $scope.login = function (auth) {
      Main.login(auth).then(function (response) {
        if (response.data.success)
          $scope.message = "You are now verified.";
      }, function (error) {
        console.log('Unable to register member:', error);
      });
    }


  }
]);