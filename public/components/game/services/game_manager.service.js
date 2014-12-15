function GameManager($interval, $timeout, $q, FetchPhotosFrom500px, FetchCities, Preloader, ReverseGeocoder) { 
  var manager = this;

  this.initialize = function() {
    // Provided from GameController
    // this.countriesAndCities;


    this.score = 0;
    this.combo = 0;

    this.winWidth = $(window).width();

    this.photos           = [];
    this.loadedPhotos     = [];
    this.currentPhoto     = null;
    this.currentAnswers   = null;
    this.currentQuestion  = 0;
    this.chosenAnswer     = null;
    this.page             = 1;

    this.preloadsLeft     = 3; // initial images to preload
    this.loadPercent      = 0;
    this.loadPieces       = 5; // 1 at the start, 1 for the server request, and 3 images to preload.

    this.resultsSplash    = null;

    

    this.states = {
      initial:  0,
      loading:  1,
      waiting:  2,
      running:  3,
      finished: 4,
      error:    5
    };

    this.state = this.states.initial;

    // Possible modes are 'fresh' and 'curated'
    this.mode  = null;
  };

  this.selectMode = function(mode) {
    console.log("SELECTING MODE ", mode)
    if (mode === 'fresh' && manager.state === manager.states.initial) {
      manager.updateLoadBar();
      FetchPhotosFrom500px.query({}, this.winWidth)
        .then(function(result) {
          manager.photos = FetchPhotosFrom500px.photos;
          manager.preloadQuestion(manager.numToPreload);
          manager.updateLoadBar();
        });

      manager.state = manager.states.loading;
    }
  };

  this.startGame = function() {
    manager.state = manager.states.running;
  };

  // Our images are loaded and we're ready to go.
  // Set it up so that the user can click 'start'.
  this.setupGame = function() {
    manager.currentPhoto   = manager.loadedPhotos.shift();
    manager.currentAnswers = manager.buildAnswers();
    manager.state          = manager.states.waiting;
  };

  this.updateLoadBar = function() {
    this.loadPercent += (1 / manager.loadPieces) * 100;
  };


  this.preloadQuestion = function() {
    var pauseLength       = 350,
        question, startTime;


    startTime = new Date().getTime();
    question = manager.photos[0];

    console.log("Calling to preload, with this many left: ", manager.preloadsLeft);

    $q.all({
      getImage:    Preloader.preloadImages([question]), 
      getLocation: ReverseGeocoder.getLocation(question)
    }).then(function(results) {

      question.location = results.getLocation.location;

      // Move our photo into the loaded queue, remove from the photos array.
      manager.loadedPhotos.push(question);
      manager.photos.shift();

      if (manager.preloadsLeft > 0)
        manager.preloadsLeft--;

      manager.updateLoadBar();


      // Alright, here's the magic.
      // If this is our final iteration, currentIteration should == iterations.
      // IF that's true, all of our preloading is done.
      // Otherwise, we'll need to figure out how much time we have left to wait,
      // set a timeout, and re-invoke this function.

      if ( manager.preloadsLeft ) {
        manager.waitAndPreloadAnother(startTime, pauseLength);
      } else {
        // Is this our initial load? If so, set up the game.
        if ( manager.state === manager.states.loading )
          manager.setupGame();
      }
    }, function(results) {
      // Something went wrong, so we want to skip this question and load a new one.
      manager.photos.shift();
      manager.waitAndPreloadAnother(startTime, pauseLength);
    });
  }

  this.waitAndPreloadAnother = function(startTime, pauseLength) {
    var endTime, iterationLength, timeLeftToWait;
    endTime = new Date().getTime();
    iterationLength = endTime - startTime;
    if ( iterationLength < pauseLength ) {
      timeLeftToWait = pauseLength - iterationLength;
      $timeout(manager.preloadQuestion, timeLeftToWait);
    } else {
      manager.preloadQuestion();
    }
  };

  this.submitAnswer = function(ans) {
    if ( this.resultsSplash === null ) {
      this.chosenAnswer = ans;
      if ( this.currentPhoto.location.city === ans.city ) {
        // They got it right!
        this.score++;
        this.combo++;
        this.resultsSplash = true;
      } else {
        this.resultsSplash = false;
        this.combo = 0;
      }

      // preload another question.
      this.preloadQuestion();

      // Fetch more questions from 500px, if necessary (or available)
      if (this.photos.length < 10) {
        this.page++;
        FetchPhotosFrom500px.query({page: this.page})
        .then(function(result) {
          _.forEach(FetchPhotosFrom500px.filteredPhotos, function(photo) {
            manager.photos.push(photo);
          });
        });
      }

      $timeout(function() {
        manager.currentPhoto = manager.loadedPhotos.shift();  
        console.log(manager.currentPhoto);
      }, 150);
    }

  };  

  this.goToNextQuestion = function() {
    this.chosenAnswer = null;
    this.currentQuestion++;
    this.currentAnswers = this.buildAnswers();

    this.resultsSplash  = null;
  };

  this.buildAnswers = function() {
    var pluckedCity1 = this.pickRandomCity(),
        pluckedCity2 = pluckedCity1;

    this.rightAnswer = this.currentPhoto.location;

    while( pluckedCity1.city === pluckedCity2.city ) {
      pluckedCity2 = this.pickRandomCity();
    }

    return _.shuffle([this.rightAnswer, pluckedCity1, pluckedCity2]);
  };

  this.pickRandomCity = function() {
    var ans, country, city;
    ans = _.sample(this.countriesAndCities);

    country = ans.country;
    city    = _.sample(ans.cities);

    return {
      country: country,
      city:    city
    };
  };


}


angular.module('pixelPlay.game').service('GameManager', ['$interval', '$timeout', '$q', 'FetchPhotosFrom500px', 'FetchCities', 'Preloader', 'ReverseGeocoder', GameManager]);
