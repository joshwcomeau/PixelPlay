angular
  .module('pixelPlay', ['ngRoute', 'ngResource', 'appRoutes', 'pixelPlay.game', 'pixelPlay.dashboard'])
  .run(function() {
    _500px.init({
      sdk_key: '1e6cd00470800d39b07106a70a650cdf88277901'
    });

    _500px.getAuthorizationStatus();

    _500px.on('authorization_obtained', function () {
      User.update_user('authorized');
    });
  });