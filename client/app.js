/* register the modules the application depends upon here*/
angular.module('main', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('sapaApp', ['ngRoute', 'main']);

// configure our routes
app.config(function ($routeProvider) {
  $routeProvider

    // route for the home page (anyone)
    .when('/', {
      templateUrl: 'pages/members.html',
      controller: 'mainController'
    })

    // route for the about page (anyone)
    .when('/about', {
      templateUrl: 'pages/about.html',
      controller: 'mainController'
    })

    // route for the contact page (anyone)
    .when('/contact', {
      templateUrl: 'pages/contact.html',
      controller: 'mainController'
    })

    // route for the login page (anyone)
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'mainController'
    })

    // route for the admin page (admin)
    .when('/admin', {
      templateUrl: 'pages/admin.html',
      controller: 'adminController'
    })

    // route for the register page (anyone)
    .when('/register/:registerToken', {
      templateUrl: 'pages/register.html',
      controller: 'mainController'
    })

    // route for the account page (member)
    .when('/account', {
      templateUrl: 'pages/account.html',
      controller: 'mainController'
    })

    // route for editing own profile page (member)
    .when('/editProfile', {
      templateUrl: 'pages/editProfile.html',
      controller: 'mainController'
    })

    // route for the profile page (anyone)
    .when('/profile', {
      templateUrl: 'pages/profile.html',
      controller: 'mainController'
    })

    // route for the events page (members/admins)
    .when('/events', {
      templateUrl: 'pages/events.html',
      controller: 'mainController'
    })

    // all other views
    .otherwise({
      redirectTo: '/'
    });
});