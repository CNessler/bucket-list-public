app.controller("bucketList", ['$scope', '$location', 'ItemsToPage', function ($scope, $location, ItemsToPage) {
  // $scope.itemsToPage = ItemsToPage;
  $scope.userInfo = ItemsToPage;
  $scope.signup = function () {
    $scope.newUser.lists = [];
    ItemsToPage.signup($scope.newUser).then(function (data) {
      if(data.errors){
        ItemsToPage.userInfo = data.errors
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        ItemsToPage.userInfo = data.user;
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
        ItemsToPage.userInfo = data.user;
        $location.path('/welcome');
      }
    })
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
