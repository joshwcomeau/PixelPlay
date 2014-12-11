function GameManager(FetchPhotos, FetchCities, Preloader, ReverseGeocoder) { 

  this.initialize = function() {
    // Provided from GameController
    this.cities;
    this.photos;

    this.score = 0;

    this.question     = 0;
    this.remainingQs  = this.photos.length;
    this.page         = 1;
    this.currentPhoto = null;

    this.loading      = false;
    this.loadPercent  = 0;

    // Possible states are 'initial', 'waiting', 'running', 'finished', 'error'
    this.state = 'initial';






    // First order of business: Start preloading photos!
    this.preloadPhotos(20);

    // As that happens, start updating our photo locations
    // with Google's Geocoder API.
    this.updateLocations();

  };

  this.startGame = function() {
    this.state = 'running';
  };

  // Our images are loaded and we're ready to go.
  // Set it up so that the user can click 'start'.
  this.setupGame = function() {
    this.goToNextQuestion();
    this.state = 'waiting';

  };

  this.preloadPhotos = function(num) {
    var start     = this.question,
        end       = this.question + (num || 1),  
        loadArray = this.photos.slice(start, end),
        manager   = this;

    Preloader.preloadImages(loadArray).then(
      function handleResolve() {
        manager.setupGame();
        console.log("Preload successful woohoo!");
      },
      function handleReject(loc) {
        manager.state = 'error';
        console.error( "Image failed", loc);
      },
      function handleNotify(e) {
        manager.loadPercent = e.percent;
      }
    );
  };
  this.updateLocations = function() {
    var manager = this;

    // Here's how we'll do it. We pass in ALL of our photos, and the service does them 1 at a time.
    // Whenever it finishes one, it throws back to .notify with the location. Then, here, we update
    // .photoData with that location.
    ReverseGeocoder.getLocations(manager.photos).then(
      function handleResolve() {
        console.log("All images have locations", manager.photos);
      }, function handleReject(err) {
        console.log("Uh oh, something went wrong", err);
      }, function handleNotify(response) {
        manager.photos[response.index].location = response.location;
        console.log(manager.photos);
      }
    );
  };

  this.goToNextQuestion = function() {
    this.currentPhoto = this.photos.shift();
    this.remainingQs  = this.photos.length;
    this.question++;
  };


}


angular.module('pixelPlay.game').service('GameManager', ['FetchPhotos', 'FetchCities', 'Preloader', 'ReverseGeocoder', GameManager]);
