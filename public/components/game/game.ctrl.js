function GameController($scope, FetchPhotos) {
  this.round = 1;
  this.photos = null;
}

GameController.prototype.start = function() {
  // get photos. Will extract to Service if it works
  _500px.api('/photos', {feature: 'popular', page: 1}, function (response) {
    if (response.success) {
      alert('There are ' + response.data.photos.length + ' photos.');
    } else {
      alert('Unable to complete request: ' + response.status + ' - ' + response.error_message);
    }
  });
};

GameController.$inject = ['$scope', 'FetchPhotos'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'FetchPhotos', GameController]);