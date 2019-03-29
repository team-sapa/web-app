/* register the modules the application depends upon here*/
angular.module('main', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('sapaApp', ['ngRoute', 'main']);

// configure our routes
app.config(function ($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl: 'pages/members.html',
      controller: 'mainController'
    })

    // route for the about page
    .when('/about', {
      templateUrl: 'pages/about.html',
      controller: 'mainController'
    })

    // route for the contact page
    .when('/contact', {
      templateUrl: 'pages/contact.html',
      controller: 'mainController'
    })

    // route for the login page
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'mainController'
    })

    // route for the admin page
    .when('/admin', {
      templateUrl: 'pages/admin.html',
      controller: 'adminController'
    })

    // route for the register page
    .when('/register', {
      templateUrl: 'pages/register.html',
      controller: 'mainController'
    })

    // route for the profile page
    .when('/profile', {
      templateUrl: 'pages/profile.html',
      controller: 'mainController'
    })

    // all other views
    .otherwise({
      redirectTo: '/'
    });
});