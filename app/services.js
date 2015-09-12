app.service("ItemsToPage", ['$http', function ($http) {

  this.signup = function (newUser) {
    return $http.post('http://localhost:3000/api/signup', newUser).then(function (response) {
      return response.data
    })
  }
  this.login = function (user) {
    return $http.post('http://localhost:3000/api/login', user).then(function (response) {
      return response.data
    })
  }

  this.insert = function (post) {
    return $http.post('http://localhost:3000/api/insert', post)
  }

  this.updateProfile = function (profile) {
    console.log(profile, "being sent to server");
    $http.post('http://localhost:3000/api/profile', profile)
  }
}])
