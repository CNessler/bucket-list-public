
app.factory("BucketListService", ["$http", function ($http) {
  return {
    all: function () {
      return $http.get('http://localhost:3000/api/all').then(function (allUsers) {
        console.log(allUsers, 'all the users');
        return allUsers.data;
      })  
    }
  }
}])
