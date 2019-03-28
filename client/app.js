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
      controller: 'membersController'
    })

    // route for the about page
    .when('/about', {
      templateUrl: 'pages/about.html',
      controller: 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
      templateUrl: 'pages/contact.html',
      controller: 'contactController'
    })

    // route for the login page
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'loginController'
    })

    // route for the admin page
    .when('/admin', {
      templateUrl: 'pages/admin.html',
      controller: 'adminController'
    })

    // all other views
    .otherwise({
      redirectTo: '/'
    });
});