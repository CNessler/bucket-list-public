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
    console.log(post, 'to be inserted to db');
    return $http.post('http://localhost:3000/api/insert', post)
  }

  this.updateProfile = function (profile) {
    $http.post('http://localhost:3000/api/profile', profile)
  }

  this.findFriends = function (search) {
    return $http.post('http://localhost:3000/api/search', search).then(function (results) {
      return results.data
    })
  }
  this.findOne = function (friend) {
    return $http.get('http://localhost:3000/api/friend', {
        params: {
                  friend: friend._id
                }
     }).then(function (friend) {
       return friend.data
    })
  }
  this.addFriend = function (currentUser) {
    console.log(currentUser, 'being sent to server');
    $http.post('http://localhost:3000/api/addFriend', currentUser)
  }
}])
