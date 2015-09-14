app.controller("bucketList", ['$scope', '$location', 'ItemsToPage', '$cookies', '$localStorage', function ($scope, $location, ItemsToPage, $cookies, $localStorage) {

  $scope.$storage = $localStorage
  $scope.signup = function () {
    $scope.newUser.lists = [];
    $scope.newUser.friends = [];
    $scope.newUser.pendingFriends = [];
    ItemsToPage.signup($scope.newUser).then(function (data) {
      if(data.errors){
        $scope.$storage.ItemsToPage.errors = data.errors
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        $scope.$storage.ItemsToPage = data;
        $cookies.put('name', data.user._id)
        $location.path('/welcome/' + data.user._id);
      }
    })
  }

  $scope.login = function () {
    ItemsToPage.login($scope.user).then(function (data) {
      if(data.errors){
        $scope.$storage.ItemsToPage.errors = data.errors
        $scope.user = {};
        $location.path('/login');
      } else {
        $scope.$storage.ItemsToPage = data;
        console.log(data, "DATA");
        $cookies.put('name', data.user._id)
        $location.path('/welcome/' + data.user._id);
      }
    })
  }

  $scope.newBucket = true;

  $scope.toggleNewBucket = function () {
    $scope.newBucket = $scope.newBucket === false ? true: false;
  }

  $scope.addDream = function () {
    $scope.item._id = $scope.$storage.ItemsToPage.user._id;
    ItemsToPage.insert($scope.item)
    $scope.$storage.ItemsToPage.user.lists.push($scope.item)
    $scope.item = {};
  }
  $scope.logout = function () {
    $cookies.remove("name");
    $scope.$storage.$reset();
    $location.path('/home');
  }
  $scope.updateProfile = function () {
    ItemsToPage.updateProfile($scope.$storage.ItemsToPage.user);
    $location.path('/welcome/' + $scope.$storage.ItemsToPage.user._id)
  }
  $scope.findFriends = function () {
    ItemsToPage.findFriends($scope.search).then(function (foundFriends) {
      $scope.$storage.ItemsToPage.foundFriends = foundFriends;
    })
  }
  $scope.findOne = function (friend) {
    ItemsToPage.findOne(friend).then(function (friend) {
      $scope.$storage.ItemsToPage.oneFriend = friend;
    })
  }

  $scope.addFriend = function () {
    $scope.$storage.ItemsToPage.user.friendId = $scope.$storage.ItemsToPage.oneFriend.foundFriend._id;
    ItemsToPage.addFriend($scope.$storage.ItemsToPage.user);
  }

}])






//
// $scope.userInfo = ItemsToPage;
// $scope.signup = function () {
//   $scope.newUser.lists = [];
//   ItemsToPage.signup($scope.newUser).then(function (user) {
//     ItemsToPage = user;
//     console.log(user, "USER");
//     console.log(user._id, "USER");
//     $location.path('/welcome/' + user._id);
//   })
// }
