angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl:  '/components/dashboard/dashboard.index.html',
      controller:   'DashboardController',
      controllerAs: 'dash'
    })

    // GAME ===================================================================
    // GET :index
    .when('/game', {
      templateUrl:  '/components/game/game.index.html',
      controller:   'GameController',
      controllerAs: 'game'
    });



    $locationProvider.html5Mode(true);
}]);