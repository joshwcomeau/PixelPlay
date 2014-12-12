function GameManager($interval, $timeout, $q, FetchPhotos, FetchCities, Preloader, ReverseGeocoder) { 
  var manager = this;

  this.initialize = function() {
    // Provided from GameController
    this.countriesAndCities;
    this.photos;


    this.score = 0;
    this.combo = 0;

    this.loadedPhotos     = [];
    this.currentPhoto     = null;
    this.currentAnswers   = null;
    this.currentQuestion  = 0;
    this.chosenAnswer     = null;
    this.page             = 1;

    this.resultsSplash    = null;

    this.loading          = false;
    this.loadPercent      = 0;

    // Possible states are 'initial', 'waiting', 'running', 'finished', 'error'
    this.state = 'initial';



    // First order of business: Start preloading photos and locations!
    this.preloadQuestions(3);

  };

  this.startGame = function() {
    this.state = 'running';
  };

  // Our images are loaded and we're ready to go.
  // Set it up so that the user can click 'start'.
  this.setupGame = function() {
    this.currentPhoto   = this.loadedPhotos.shift();
    this.currentAnswers = this.buildAnswers();
    this.state          = 'waiting';
  };

  this.preloadQuestions = function(iterations) {
    var index             = 0,
        currentIteration  = 0,
        pauseLength       = 200,
        question, startTime, endTime, iterationLength, timeLeftToWait;

    manager.loading = true;
    iterations = iterations || 1;

    preloadQuestion();



    function preloadQuestion() {
      startTime = new Date().getTime();

      question = manager.photos[0];

      $q.all({
        getImage:    Preloader.preloadImages([question]), 
        getLocation: ReverseGeocoder.getLocation(question)
      }).then(function(results) {

        question.location = results.getLocation.location;
        console.log(question.location);
        manager.loadedPhotos.push(question);

        manager.photos.shift();

        

        currentIteration++;
        manager.loadPercent = (currentIteration / iterations) * 100;


        // Alright, here's the magic.
        // If this is our final iteration, currentIteration should == iterations.
        // IF that's true, all of our preloading is done.
        // Otherwise, we'll need to figure out how much time we have left to wait,
        // set a timeout, and re-invoke this function.

        if ( currentIteration === iterations ) {
          manager.loading = false;

          // Is this our initial load? If so, set up the game.
          if ( manager.state === 'initial' ) {
            manager.setupGame();
          }

        } else {
          endTime = new Date().getTime();
          iterationLength = endTime - startTime;
          if ( iterationLength < pauseLength ) {
            timeLeftToWait = pauseLength - iterationLength;
            $timeout(preloadQuestion, timeLeftToWait);
          } else {
            preloadQuestion();
          }
        }
      });
    }
  };

  this.submitAnswer = function(ans) {
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
    this.preloadQuestions();

    // Fetch more questions from 500px, if necessary (or available)
    if (this.photos.length < 10) {
      this.page++;
      FetchPhotos.query({page: this.page})
      .then(function(result) {
        _.forEach(FetchPhotos.filteredPhotos, function(photo) {
          manager.photos.push(photo);
        });
        unique_ids = _.chain(manager.photos)
          .map(function(photo) { return photo.id })
          .uniq()
          .value();
        console.log(unique_ids);
      });
    }

    $timeout(function() {
      manager.currentPhoto = manager.loadedPhotos.shift();  
    }, 150);
    

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


angular.module('pixelPlay.game').service('GameManager', ['$interval', '$timeout', '$q', 'FetchPhotos', 'FetchCities', 'Preloader', 'ReverseGeocoder', GameManager]);
