angular.module('pixelPlay').service('User', ['$rootScope', function($rootScope) {
  var user = this;

  user.current_user = null;


  // This is passed in as the callback to 500px's login().
  // 'res' is a simple string letting us know if they've been approved or not.
  user.update_user = function(res) {
    console.log("Updating user");
    if ( res == 'authorized' ) {
      console.log("user is authorized!");
      // Cool, we've got their permission. Let's get their username.
      _500px.api('/users', function (response) {
        console.log(response);
        user.current_user = response.data.user;
        $rootScope.$broadcast('userAuthenticated', response.data.user);
      });
    }
  };
}]);