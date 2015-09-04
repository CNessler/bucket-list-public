app.controller("bucketList", ['$scope', '$location', 'BucketListService', function ($scope, $location, BucketListService) {
  $scope.message = "HEYO";

  $scope.signup = function () {
    console.log('in func');
    $scope.newUser.lists = [];
    BucketListService.signup($scope.newUser).then(function (newUser) {
      $location = '/welcome';
      
    })
  }
}])
