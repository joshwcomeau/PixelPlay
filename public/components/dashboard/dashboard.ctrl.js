function DashboardController($scope, User) {
  var dash = this;

  this.tagline = "Welcome to the dashboard.";
  

  $scope.$on("userAuthenticated", function(e, counter) {
    $scope.$apply(function() {
      dash.userService = User;
      // dash.current_user = User.current_user;
    });
  });
}

DashboardController.prototype.login = function() {
  console.log("Login clicked");
  _500px.login(this.userService.update_user);
};

DashboardController.prototype.update = function() {
  this.current_user = User.current_user;
};

DashboardController.$inject = ['$scope', 'User'];
angular.module('pixelPlay.dashboard').controller('DashboardController', ['$scope', 'User', DashboardController]);