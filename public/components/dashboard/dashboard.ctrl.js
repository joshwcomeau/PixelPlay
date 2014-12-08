function DashboardController($scope, User) {
  this.tagline = "Welcome to the dashboard.";
  this.login = _500px.login(User.update_user);
}

DashboardController.prototype.someMethod = function() {};

DashboardController.$inject = ['$scope', 'User'];
angular.module('pixelPlay.dashboard').controller('DashboardController', ['$scope', 'User', DashboardController]);