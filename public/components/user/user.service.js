angular.module('pixelPlay').service('User', function() {
  this.current_user = null;

  // This is passed in as the callback to 500px's login().
  // 'res' is a simple string letting us know if they've been approved or not.
  this.update_user = function(res) {
    if ( res == 'authorized' ) {
      // Cool, we've got their permission. Let's get their username.
      _500px.api('/users', function (response) {
        console.log(response);
      });
    }
  }
});