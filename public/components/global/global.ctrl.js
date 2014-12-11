function GlobalController($scope, User, GameManager) {
  var global = this;

  global.manager = GameManager;

  global.currentUser = null;
  global.userService = User;

  $scope.$on("userAuthenticated", function(e, data) {
    $scope.$apply(function() {
      global.currentUser = data;
      console.log(data);
    });
  });
}


GlobalController.$inject = ['$scope', 'User', 'GameManager'];
angular.module('pixelPlay').controller('GlobalController', ['$scope', 'User', 'GameManager', GlobalController]);