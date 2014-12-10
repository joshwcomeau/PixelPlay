angular.module('pixelPlay.game').factory("FetchPhotos", ["$q", function($q) {
  var filteredPhotos;

  return {
    get: function(opts) {
      var deferred = $q.defer();

      _500px.api('/photos', opts, function (response) {
        if (response.success) {
          filteredPhotos = _.filter(response.data.photos, function(photo) {
            return photo.latitude !== null;
          });
          
          deferred.resolve({
            success: true,
            data:    filteredPhotos
          });
        } else {
          deferred.reject({
            success:  false,
            status:   response.status,
            message:  response.error_message
          });
        }
      });

      return deferred.promise;
    }
  };
}]);