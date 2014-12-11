function FetchPhotos($q) {
  return {
    allPhotos:      [],
    filteredPhotos: [],

    query: function(givenOpts) {
      var 
      deferred = $q.defer(),
      defaultOpts = {
        feature:    'fresh_today',
        only:       'Urban Exploration',
        image_size: 5,
        rpp:        100
      },
      opts = givenOpts || defaultOpts,
      _this    = this;

      _500px.api('/photos', opts, function (response) {
        if (response.success) {
          _this.allPhotos      = response.data.photos;
          _this.filteredPhotos = _this.appropriateForGame(response.data.photos);

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

    // We need to strip out the photos that aren't well suited for our game.
    // Needs to have location coordinates, at least 1200px wide, and landscape orientation.
    appropriateForGame: function(photos) {
      return _.filter(photos, function(photo) {
        return (
          photo.latitude !== null && 
          photo.longitude !== null &&
          photo.width >= 1200 &&
          photo.width > photo.height
        );
      });
    }
  };
}

angular.module('pixelPlay.game').factory("FetchPhotos", ["$q", FetchPhotos]);