function GameController($scope) {
  this.round = 1;
  this.photoData = null;
  this.currentPhoto = null;
}

GameController.prototype.start = function() {
  var game = this;

  // get photos. Will extract to Service if it works
  var photo_options = {
    feature:    'fresh_today',
    only:       'Urban Exploration',
    image_size: 4,
    rpp:        100
  };

  _500px.api('/photos', photo_options, function (response) {
    if (response.success) {
      console.log(response.data)
      game.photoData = _.filter(response.data.photos, function(photo) {
        return photo.latitude !== null;
      });
      game.currentPhoto = game.photoData.pop()

      console.log("num of photos", response.data.photos.length, "after filtering", game.photoData.length)
    } else {
      alert('Unable to complete request: ' + response.status + ' - ' + response.error_message);
    }
  });
};

GameController.prototype.getNextPhoto = function() {
  this.currentPhoto = this.photoData.pop()
};

GameController.$inject = ['$scope'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', GameController]);