
app.factory("BucketListService", ["$http", function ($http) {
  return {
    signup: function (newUser) {
      return $http.post('http://localhost:3000/api/signup', newUser).then(function (response) {
        console.log(response, "THIS IS THE RESPONSE");
      })
    }
  }
}])
