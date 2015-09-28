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
    return $http.post('http://localhost:3000/api/insert', post).then(function (updatedUser) {
      console.log(updatedUser, 'updated user to controller');
      return updatedUser.data.user
    })
  }

  this.updateProfile = function (profile) {
    $http.post('http://localhost:3000/api/profile', profile)
  }

  this.findFriends = function (search) {
    console.log(search, 'sending to db');
    return $http.post('http://localhost:3000/api/search', search).then(function (results) {
      console.log(results, 'results from db');
      return results.data
    })
  }

  this.findOne = function (friend) {
    return $http.get('http://localhost:3000/api/friend', {
        params: {
                  friend: friend._id
                }
     }).then(function (friend) {
       return friend.data.foundFriend
    })
  }

  this.addFriend = function (currentUser) {
    return $http.post('http://localhost:3000/api/addFriend', currentUser).then(function (updatedFriend) {
      return updatedFriend.data
    })
  }

  this.addLike =  function (item) {
    $http.post('http://localhost:3000/api/addLike', item).then(function (updatedUser) {
      console.log(updatedUser, 'going to client');
      return updatedUser.data
    })
  }

  this.addToFriends = function (friend) {
    console.log(friend, "going to db");
    return $http.post('http://localhost:3000/api/addToFriends', friend).then(function (updatedUser) {
      console.log(updatedUser, 'User updated');
      return updatedUser.data.user
    })
  }

  this.removePending = function (friend) {
    return $http.post('http://localhost:3000/api/removePending', friend).then(function (updatedUser) {
      return updatedUser.data
    })
  }

  this.completed = function (item) {
    return $http.post('http://localhost:3000/api/completed', item).then(function (updatedUser) {
      console.log(updatedUser, 'USER UPDATED');
      return updatedUser.data
    })
  }

  this.state = function (letter) {
    console.log(letter, 'lette going to server');
    return $http.get('http://localhost:3000/api/state', {
      params: { letter: letter}
    }).then(function (response) {
      //parse out by terms length
      // if less than three it is a state and use the first for the state name
      //else it is a city so use that for to find and prefill city
      console.log(response, 'Please work');
    })
  }
}])
