function GameController($scope, GameManager, FetchPhotos, Preloader) {
  this.question     = 0;
  this.photoData    = null;
  this.currentPhoto = null;
  this.fetchPhotos  = FetchPhotos;
  this.photoData    = FetchPhotos.filteredPhotos;

  this.loading      = false;
  this.loadPercent  = null;
  this.preloader    = Preloader;

  this.manager      = GameManager;

  

  // Load strategy: start by loading the first x images.
  // Then, every time we move to the next image, preload another.
  // We should always have x images cached and ready to go.
  this.preloadPhotos(20);
}


// Called in app.routes.js before the view is rendered.
GameController.resolve = {
  getPhotos: ['FetchPhotos', function(FetchPhotos) {
    return FetchPhotos.get();
  }]
};

GameController.prototype.start = function() {
  this.manager.state = 'running';
};

GameController.prototype.getNextPhoto = function() {
  this.currentPhoto = this.photoData.shift();
};

GameController.prototype.preloadPhotos = function(num) {
  var start     = this.question,
      end       = this.question + (num || 1),  
      loadArray = this.photoData.slice(start, end),
      game      = this;

  this.preloader.preloadImages(loadArray).then(
    function handleResolve() {
      game.getNextPhoto();
      if ( game.manager.state === 'initial' ) game.manager.state = 'waiting';
      console.log("Preload successful!");
    },
    function handleReject(loc) {
      game.manager.state = 'error';
      console.error( "Image failed", loc);
    },
    function handleNotify(e) {
      game.loadPercent = e.percent;
      console.log("Percent loaded", e);
    }
  );
};

GameController.$inject = ['$scope', 'GameManager', 'FetchPhotos', 'Preloader'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'GameManager', 'FetchPhotos', 'Preloader', GameController]);