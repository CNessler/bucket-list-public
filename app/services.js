app.service("ItemsToPage", ['$http', function ($http) {
  this.userInfo;

  this.signup = function (newUser) {
    return $http.post('http://localhost:3000/api/signup', newUser).then(function (response) {
      return response.data
    })
  }
  this.login = function (user) {
    console.log('here');
    return $http.post('http://localhost:3000/api/login', user).then(function (response) {
      console.log(response.data, "should be errors");
      return response.data
    })
  }
}])
