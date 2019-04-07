angular.module('sapaApp').controller('mainController', ['$scope', 'Main',
  function ($scope, Main) {



    $scope.friends = [
      { name: 'John', image: "../images/UserDefault.png" },
      { name: 'Jessie', image: "../images/UserDefault1.png" },
      { name: 'Johanna', image: "../images/UserDefault2.png" },
      { name: 'Joy', image: "../images/UserDefault.png" },
      { name: 'Mary', image: "../images/UserDefault1.png" },
      { name: 'Peter', image: "../images/UserDefault2.png" },
      { name: 'Sebastian', image: "../images/UserDefault.png" },
      { name: 'Erika', image: "../images/UserDefault1.png" },
      { name: 'Patrick', image: "../images/UserDefault2.png" },
      { name: 'Samantha', image: "../images/UserDefault.png" }
    ];






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



    // retrieve all members on startup
    Main.list().then(function (response) {
      $scope.members = response.data;
    }, function (error) {
      console.log('Unable to retrieve members:', error);
    });


    // update member info
    $scope.update = function (updatedMember) {
      updatedMember.token = $scope.token;
      Main.update(updatedMember).then(function (response) {
        $scope.member = response.data;
      }, function (error) {
        console.log('Unable to retrieve member:', error);
      });
    }

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
          if (response.data.success) {
            $scope.message = "You are now verified.";
            window.location.href = '/#/login';
            window.location.reload();
          }
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
        if (response.data.success) {
          Main.setToken(response.data.token);
          Main.setUser(response.data.member[0]);
          window.location.href = '/#/account';
          window.location.reload();
        }
      }, function (error) {
        console.log('Unable to login member:', error);
      });
    }

    // logout a member
    $scope.logout = function (auth) {
      console.log("logging out");
      Main.logout();
      window.location.href = '/#/login';
      window.location.reload();
    }

  }
]);