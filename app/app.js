var app = angular.module("Bucket", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'bucketList'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'bucketList'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'bucketList'
    })
    .when('/welcome', {
      templateUrl: 'partials/welcome.html',
      controller: 'bucketList'
    })
})
