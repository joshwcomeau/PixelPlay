function GameController($scope, FetchPhotos) {
  this.round = 1;
  this.photoData = null;
  this.currentPhoto = null;
  this.fetchPhotos = FetchPhotos;
}

GameController.prototype.start = function() {
  var game = this;

  // get photos. Will extract to Service if it works
  var opts = {
    feature:    'fresh_today',
    only:       'Urban Exploration',
    image_size: 4,
    rpp:        100
  };

  game.fetchPhotos.get(opts)
    .then(function(res) {
      alert("Success: " + res.success);
    }, function(res) {
      alert("Failed: " + res.message);
    });



  // if ( game.photoData.error ) {
  //   alert("ERROR: Code " + game.photoData.status + " with message " + game.photoData.message);
  // }

  // game.currentPhoto = game.photoData.pop();

};

GameController.prototype.getNextPhoto = function() {
  this.currentPhoto = this.photoData.pop();
};

GameController.$inject = ['$scope', 'FetchPhotos'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'FetchPhotos', GameController]);