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
    })

    // USER CALLBACK ==========================================================
    .when('/500px/callback.html', {
      templateUrl:  '/components/callback/callback.html',
      controller:   'CallbackController',
      controllerAs: 'cb'
    });



    $locationProvider.html5Mode(true);
}]);