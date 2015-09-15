app.controller("bucketList", ['$scope', '$location', 'ItemsToPage', '$cookies', '$localStorage', function ($scope, $location, ItemsToPage, $cookies, $localStorage) {

  $scope.$storage = $localStorage
  $scope.signup = function () {
    $scope.newUser.bucket = [];
    $scope.newUser.friends = [];
    $scope.newUser.pendingFriends = [];
    ItemsToPage.signup($scope.newUser).then(function (data) {
      console.log(data, 'data returned to client from db');
      if(data.errors){
        console.log(data.errors, 'errors here');
        $scope.$storage.ItemsToPage = data.errors
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        $scope.$storage.ItemsToPage = data.user;
        $scope.$storage.ItemsToPage.loggedIn = true;
        $cookies.put('name', data.user._id)
        $location.path('/welcome/' + data.user._id);
      }
    })
  }

  $scope.login = function () {
    ItemsToPage.login($scope.user).then(function (data) {
      console.log(data, 'coming to client');
      if(data.errors){
        $scope.$storage.ItemsToPage = data.errors
        $scope.user = {};
        $location.path('/login');
      } else {
        $scope.$storage.ItemsToPage = data.user.foundUser;
        $scope.$storage.ItemsToPage.bucket = data.user.foundItems;
        $scope.$storage.ItemsToPage.loggedIn = data.loggedIn;
        $cookies.put('name', data.user.foundUser._id)
        $location.path('/welcome/' + data.user.foundUser._id);
      }
    })
  }

  $scope.newBucket = true;

  $scope.toggleNewBucket = function () {
    $scope.newBucket = $scope.newBucket === false ? true: false;
  }

  $scope.addDream = function () {
    $scope.item.user = $scope.$storage.ItemsToPage._id;
    $scope.item.likes = 0;
    ItemsToPage.insert($scope.item)
    $scope.$storage.ItemsToPage.bucket.push($scope.item)
    $scope.item = {};
  }
  $scope.logout = function () {
    $cookies.remove("name");
    $scope.$storage.$reset();
    $location.path('/home');
  }
  $scope.updateProfile = function () {
    ItemsToPage.updateProfile($scope.$storage.ItemsToPage.foundUser);
    $location.path('/welcome/' + $scope.$storage.ItemsToPage.user._id)
  }
  $scope.findFriends = function () {
    ItemsToPage.findFriends($scope.search).then(function (foundFriends) {
      $scope.$storage.ItemsToPage.foundFriends = foundFriends;
    })
  }
  $scope.findOne = function (friend) {
    console.log(friend, 'friend');
    ItemsToPage.findOne(friend).then(function (friend) {
      $scope.$storage.ItemsToPage.oneFriend = friend.friend;
      $scope.$storage.ItemsToPage.bucket = friend.foundItems;
    })
  }
  $scope.switch = true;
  $scope.addFriend = function () {
    $scope.switch = false;
    $scope.$storage.ItemsToPage.friend = {
      _id: $scope.$storage.ItemsToPage.oneFriend._id,
      user: $scope.$storage.ItemsToPage._id
    }
    ItemsToPage.addFriend($scope.$storage.ItemsToPage.friend);
  }

  $scope.addLike = function (item) {
    item.likes += 1;
    ItemsToPage.addLike(item);
  }

  $scope.addToFriends = function (friend) {
    friend.user = $scope.$storage.ItemsToPage._id
    friend._id = friend._id
    ItemsToPage.addToFriends(friend).then(function (updatedUser) {
      console.log(updatedUser, 'new pending friends');
    })
  }

}])
