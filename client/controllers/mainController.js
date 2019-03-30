angular.module('sapaApp').controller('mainController', ['$scope', 'Main',
  function ($scope, Main) {

    // check & set access level/auth token
    $scope.accessLevel = 0;


    // retrieve all members on startup
    Main.list().then(function (response) {
      $scope.members = response.data;
    }, function (error) {
      console.log('Unable to retrieve members:', error);
    });


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
        if (response.success)
          $scope.message = "Member created. Verification email sent.";
        else
          $scope.message = "Error.";
      }, function (error) {
        console.log('Unable to create member:', error);
      });
    }

    // register a member (member using registration link)
    $scope.register = function (newUser) {
      if (newUser.password == newUser.confirmPassword) {
        let regURL = window.location.hash;
        regURL = regURL.replace('#', '');
        newUser.registrationURL = regURL;
        Main.register(newUser).then(function (response) {
          console.log(response);
          if (response.data.success)
            $scope.message = "You are now verified.";
          else
            $scope.message = "Error.";
        }, function (error) {
          console.log('Unable to register member:', error);
        });
      }
      else {
        $scope.message = "Passwords do not match!";
      }

    }

    // login a member
    $scope.login = function (auth) {
      Main.login(auth).then(function (response) {
        console.log(response);
        if (response.data.message)
          $scope.loginmessage = response.data.message;
      }, function (error) {
        console.log('Unable to register member:', error);
      });
    }


  }
]);