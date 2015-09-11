app.controller("bucketList", ['$scope', '$location', 'ItemsToPage', '$cookies', '$localStorage', function ($scope, $location, ItemsToPage, $cookies, $localStorage) {

  $scope.$storage = $localStorage
  $scope.signup = function () {
    $scope.newUser.lists = [];
    ItemsToPage.signup($scope.newUser).then(function (data) {
      if(data.errors){
        ItemsToPage.userInfo = data.errors
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        ItemsToPage.userInfo = data.user;
        $cookies.put('name', data.user._id)
        $location.path('/welcome');
      }
    })
  }

  $scope.login = function () {
    ItemsToPage.login($scope.user).then(function (data) {
      console.log(data, "DATA");
      if(data.errors){
        ItemsToPage.userInfo = data.errors
        $scope.user = {};
        $location.path('/login');
      } else {
        $scope.$storage.ItemsToPage = data.user;
        $cookies.put('name', data.user._id)
        $location.path('/welcome');
      }
    })
  }

  $scope.newBucket = true;

  $scope.toggleNewBucket = function () {
    $scope.newBucket = $scope.newBucket === false ? true: false;
  }

  $scope.addDream = function () {
    $scope.item._id = $scope.$storage.ItemsToPage._id;
    ItemsToPage.insert($scope.item)
    $scope.$storage.ItemsToPage.lists.push($scope.item)
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
