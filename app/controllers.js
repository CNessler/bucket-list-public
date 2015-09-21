app.controller("bucketList", ['$scope', '$location', 'ItemsToPage', '$cookies', '$localStorage', 'BucketListService', function ($scope, $location, ItemsToPage, $cookies, $localStorage, BucketListService) {
  $scope.users;
  BucketListService.all().then(function (allUsers) {
    $scope.users = allUsers
  })
  console.log($scope.users, "USERS");

  $scope.$storage = $localStorage
  $scope.signup = function () {
    $scope.newUser.bucket = [];
    $scope.newUser.friends = [];
    $scope.newUser.pendingFriends = [];
    // $scope.newUser.photo = uploadFile()
    console.log($scope.newUser, 'NEW USER WITH PHOTO');
    ItemsToPage.signup($scope.newUser).then(function (data) {
      if(data.errors){
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
      if(data.errors){
        $scope.$storage.ItemsToPage = data.errors
        $scope.user = {};
        $location.path('/login');
      } else {
        $scope.$storage.ItemsToPage = data.user.foundUser;
        $scope.$storage.ItemsToPage.pendingFriends = data.user.pendingFriendsInfo;
        $scope.$storage.ItemsToPage.foundFriends = data.user.foundFriends;
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
    $scope.item.likedBy = [];
    $scope.item.completed = false;
    console.log($scope.item, 'should be going to service');
    ItemsToPage.insert($scope.item).then(function (updatedUser) {
      console.log(updatedUser, "user updated from service");
      $scope.$storage.ItemsToPage = updatedUser.user;
      $scope.$storage.ItemsToPage.foundFriends = updatedUser.foundFriends;
      $scope.$storage.ItemsToPage.bucket = updatedUser.foundItems;
      $scope.$storage.ItemsToPage.pendingFriends = updatedUser.pendingFriendsInfo;
      $scope.$storage.ItemsToPage.loggedIn = true;
    })
    // $scope.$storage.ItemsToPage.bucket.push($scope.item)
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
    console.log($scope.search.letters.length, 'length of search');
    if($scope.search.letters != "" || ($scope.search.letters.length != 0)){
      ItemsToPage.findFriends($scope.search).then(function (foundFriends) {
        console.log(foundFriends.foundFriends, "found friends");
        $scope.$storage.ItemsToPage.foundFriends = foundFriends;
      })
    }
  }

  $scope.findOne = function (friend) {
    if(friend._id != $scope.$storage.ItemsToPage._id){
      ItemsToPage.findOne(friend).then(function (friend) {
        $scope.$storage.ItemsToPage.oneFriend = friend.friend;
        $scope.$storage.ItemsToPage.friendBucket = friend.foundItems;
      })
      $location.path('/friend/' + friend._id)
    } else {
      $location.path('/profile/' + $scope.$storage.ItemsToPage._id)
    }
  }

  $scope.addFriend = function () {
    $scope.$storage.ItemsToPage.friend = {
      _id: $scope.$storage.ItemsToPage.oneFriend._id,
      user: $scope.$storage.ItemsToPage._id
    }
    ItemsToPage.addFriend($scope.$storage.ItemsToPage.friend).then(function (updatedUser) {
      $scope.$storage.ItemsToPage.oneFriend = updatedUser.user.friend;
      $scope.$storage.ItemsToPage.friendBucket = updatedUser.user.foundItems;
    })
  }

  $scope.addLike = function (item) {
    item.likes += 1;
    item.beingLikedId = $scope.$storage.ItemsToPage._id;
    ItemsToPage.addLike(item).then(function (updatedUser) {
      $scope.$storage.ItemsToPage = updatedUser.user;
      $scope.$storage.ItemsToPage.foundFriends = updatedUser.foundFriends;
      $scope.$storage.ItemsToPage.bucket = updatedUser.foundItems;
      $scope.$storage.ItemsToPage.pendingFriends = updatedUser.pendingFriendsInfo;
      $scope.$storage.ItemsToPage.loggedIn = true;
    })
  }

  $scope.addToFriends = function (friend) {
    console.log('in func');
    friend = {
      user: $scope.$storage.ItemsToPage._id,
      _id: friend
    }
    ItemsToPage.addToFriends(friend).then(function (updatedUser) {
      $scope.$storage.ItemsToPage = updatedUser.user;
      $scope.$storage.ItemsToPage.foundFriends = updatedUser.foundFriends;
      $scope.$storage.ItemsToPage.bucket = updatedUser.foundItems;
      $scope.$storage.ItemsToPage.pendingFriends = updatedUser.pendingFriendsInfo;
      $scope.$storage.ItemsToPage.loggedIn = true;
    })
  }

  $scope.removePending = function (friend) {
    friend = {
      user: $scope.$storage.ItemsToPage._id,
      _id: friend
    }
    ItemsToPage.removePending(friend).then(function (updatedUser) {
      $scope.$storage.ItemsToPage = updatedUser.user;
      $scope.$storage.ItemsToPage.loggedIn = true;
    })
  }
  $scope.checkLikesToHide = function (item) {
    return item.oneFriend.likedBy.indexOf(item._id) ? true :false;
  }

  $scope.checkToHide = function (item) {
    if(item._id === item.oneFriend._id || (item.oneFriend.pendingFriends.indexOf(item._id) != -1) || (item.friends.indexOf(item.oneFriend._id) != -1)){
      return true
    } else {
      return false
    }
  }

  $scope.completed = function (item) {
    item.completed = true;
    ItemsToPage.completed(item).then(function (updatedUser) {
      $scope.$storage.ItemsToPage = updatedUser.user;
      $scope.$storage.ItemsToPage.foundFriends = updatedUser.foundFriends;
      $scope.$storage.ItemsToPage.bucket = updatedUser.foundItems;
      $scope.$storage.ItemsToPage.pendingFriends = updatedUser.pendingFriendsInfo;
      $scope.$storage.ItemsToPage.loggedIn = true;
    })
  }

  $scope.seeResults = function (person) {
      console.log(person != undefined, 'person');
    if(person === undefined || person.length === 0 || person === ""){
      return false
    } else {
      console.log('false, should be false');
      return true
    }
  }

}])
