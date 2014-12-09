function DashboardController($scope, User) {
  var dash = this;

  dash.tagline      = "Welcome to the dashboard.";
  dash.currentUser  = null;
  dash.user         = User;

  $scope.$on("userAuthenticated", function(e, data) {
    $scope.$apply(function() {
      dash.currentUser = data;
      console.log(data);
    });
  });
}


DashboardController.$inject = ['$scope', 'User'];
angular.module('pixelPlay.dashboard').controller('DashboardController', ['$scope', 'User', DashboardController]);