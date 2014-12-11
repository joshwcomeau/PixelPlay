angular
  .module('pixelPlay', ['ngAnimate', 'ngRoute', 'ngResource', 'appRoutes', 'pixelPlay.game', 'pixelPlay.score'])
  .run(['User', '$rootScope', function(User, $rootScope) {
    _500px.init({
      sdk_key: '1e6cd00470800d39b07106a70a650cdf88277901'
    });

    console.log("500px initialized");

    _500px.getAuthorizationStatus(User.updateUser);

}]);