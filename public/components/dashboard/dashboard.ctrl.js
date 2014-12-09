function DashboardController($scope, User) {
  this.tagline = "Welcome to the dashboard.";
  this.userService = User;
}

DashboardController.prototype.login = function() {
  console.log("Login clicked");
  _500px.login(this.userService.update_user);
};

DashboardController.prototype.getAuthStatus = function() {
  alert(_500px.getAuthorizationStatus());
};

DashboardController.$inject = ['$scope', 'User'];
angular.module('pixelPlay.dashboard').controller('DashboardController', ['$scope', 'User', DashboardController]);