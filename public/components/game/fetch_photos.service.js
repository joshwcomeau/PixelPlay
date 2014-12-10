function FetchPhotos($q) {
  return {
    allPhotos:      [],
    filteredPhotos: [],

    get: function(opts) {
      var deferred = $q.defer(),
          _this    = this;

      _500px.api('/photos', opts, function (response) {
        if (response.success) {
          _this.allPhotos      = response.data.photos;
          _this.filteredPhotos = _this.onlyWithLocation(response.data.photos);

          deferred.resolve({
            success: true
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
    },

    onlyWithLocation: function(photos) {
      return _.filter(photos, function(photo) {
        return photo.latitude !== null && photo.longitude !== null;
      });
    }
  };
}

angular.module('pixelPlay.game').factory("FetchPhotos", ["$q", FetchPhotos]);