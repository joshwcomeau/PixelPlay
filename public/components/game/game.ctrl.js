function GameController($scope, GameManager, FetchPhotos, Preloader, ReverseGeocoder) {
  this.question     = 0;
  this.page         = 1;
  this.photoData    = null;
  this.currentPhoto = null;
  this.fetchPhotos  = FetchPhotos;
  this.photoData    = FetchPhotos.filteredPhotos;
  this.revGeocoder  = ReverseGeocoder;



  this.loading      = false;
  this.loadPercent  = null;
  this.preloader    = Preloader;

  this.manager      = GameManager;

  

  // Load strategy: start by loading the first x images.
  // Then, every time we move to the next image, preload another.
  // We should always have x images cached and ready to go.
  // If there aren't x images left in the cache, fetch the next 
  // bunch of photos from 500px. Push to this.photoData for seamlessness.
  this.preloadPhotos(20);

  this.updateLocations();

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
    }
  );
};

GameController.prototype.updateLocations = function() {
  var game = this;

  // Here's how we'll do it. We pass in ALL of our photos, and the service does them 1 at a time.
  // Whenever it finishes one, it throws back to .notify with the location. Then, here, we update
  // .photoData with that location.
  game.revGeocoder.getLocations(game.photoData).then(
    function handleResolve() {
      console.log("All images have locations", game.photoData);
    }, function handleReject(err) {
      console.log("Uh oh, something went wrong", err);
    }, function handleNotify(response) {
      console.log(response);
    }
  );
};

GameController.$inject = ['$scope', 'GameManager', 'FetchPhotos', 'Preloader', 'ReverseGeocoder'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'GameManager', 'FetchPhotos', 'Preloader', 'ReverseGeocoder', GameController]);