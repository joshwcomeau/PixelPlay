angular.module('pixelPlay').service('User', ['$rootScope', 'Score', function($rootScope, Score) {
  var user = this;

  user.currentUser = null;
  user.data        = null;


  user.login = function() {
    _500px.login(user.updateUser);
  };

  user.logout = function() {
    _500px.logout(user.updateUser);
  };

  // This is passed in as the callback to 500px's getAuthorizationStatus().
  user.updateUser = function(res) {
    if ( res === 'authorized' ) {
      // Cool, we've got their permission. Let's get their user data.
      _500px.api('/users', function (response) {
        console.log(response);
        user.currentUser = response.data.user;
        user.data        = response;
        $rootScope.$broadcast('userAuthenticated', response.data.user);
      });
    } else {
      console.log("updateUser is logging out");
      user.currentUser = user.data = null;
    }
  };
}]);