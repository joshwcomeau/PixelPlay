function GlobalController($scope, User) {
  var global = this;

  global.currentUser = null;
  global.userService = User;

  $scope.$on("userAuthenticated", function(e, data) {
    $scope.$apply(function() {
      global.currentUser = data;
      console.log(data);
    });
  });
}


GlobalController.$inject = ['$scope', 'User'];
angular.module('pixelPlay').controller('GlobalController', ['$scope', 'User', GlobalController]);