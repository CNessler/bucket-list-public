var app = angular.module("Bucket", ["ngRoute", "ngCookies", "ngStorage"]);

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
    .when('/welcome/:id', {
      templateUrl: 'partials/welcome.html',
      controller: 'bucketList'
    })
    .when('/profile/:id', {
      templateUrl: 'partials/profile.html',
      controller: 'bucketList'
    })
})
