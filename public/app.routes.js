angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl:  '/components/dashboard/dashboard.index.html'
    })

    // GAME ===================================================================
    // GET :index
    .when('/game', {
      templateUrl:  '/components/game/game.index.html',
      controller:   'GameController',
      controllerAs: 'game',
      resolve:      GameController.resolve
    });


    $locationProvider.html5Mode(true);
}]);