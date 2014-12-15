function FetchPhotosFromNode($q) {
  return {
    allPhotos:      [],
    filteredPhotos: [],
    maxSizePhotos:  [],

    photos:         [],

    query: function(givenOpts) {
      // console.log("Querying");
      // var 
      // deferred = $q.defer(),
      // defaultOpts = {
      //   feature:    'fresh_today',
      //   only:       'Urban Exploration',
      //   image_size: 5,
      //   rpp:        100
      // },
      // opts = _.merge(defaultOpts, givenOpts);
      // _this    = this;

      // _500px.api('/photos', opts, function (response) {
      //   if (response.success) {
      //     _this.allPhotos      = response.data.photos;
      //     _this.filteredPhotos = _this.appropriateForGame(response.data.photos);
      //     _this.maxSizePhotos  = _this.getMaxSize(_this.filteredPhotos);

      //     _this.photos         = _this.maxSizePhotos;

      //     deferred.resolve({
      //       success: true
      //     });
      //   } else {
      //     deferred.reject({
      //       success:  false,
      //       status:   response.status,
      //       message:  response.error_message
      //     });
      //   }
      // });

      // return deferred.promise;
    },

    // We need to strip out the photos that aren't well suited for our game.
    // Needs to have location coordinates, at least 1200px wide, and landscape orientation.
    appropriateForGame: function(photos) {
      return _.filter(photos, function(photo) {
        return (
          photo.latitude !== null && 
          photo.longitude !== null &&
          photo.width >= 1200 &&
          photo.width > photo.height &&
          photo.width <= (photo.height * 2)
        );
      });
    },

    getMaxSize: function(photos) {
      console.log("maxSize");
      return _.map(photos, function(photo) {
        photo.image_url = photo.image_url.substr(0, photo.image_url.length-5) + "2048.jpg";
        return photo;
      });
    }
  };
}

angular.module('pixelPlay.game').factory("FetchPhotosFromNode", ["$q", FetchPhotosFromNode]);