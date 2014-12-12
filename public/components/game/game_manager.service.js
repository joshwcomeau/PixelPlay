function GameManager($interval, $timeout, $q, FetchPhotos, FetchCities, Preloader, ReverseGeocoder) { 

  this.initialize = function() {
    // Provided from GameController
    this.countriesAndCities;
    this.photos;

    console.log(this);

    this.score = 0;

    this.loadedPhotos     = [];
    this.currentPhoto     = null;
    this.currentAnswers   = null;
    this.currentQuestion  = 0;
    this.remainingQs      = this.photos.length;
    this.page             = 1;

    this.loading          = false;
    this.loadPercent      = 0;

    // Possible states are 'initial', 'waiting', 'running', 'finished', 'error'
    this.state = 'initial';



    // First order of business: Start preloading photos!
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
        pauseLength       = 500,
        manager           = this,
        question, startTime, endTime, iterationLength, timeLeftToWait;

    manager.loading = true;

    preloadQuestion();



    function preloadQuestion() {
      startTime = new Date().getTime();

      question = manager.photos[0];

      $q.all({
        getImage:    Preloader.preloadImages([question]), 
        getLocation: ReverseGeocoder.getLocation(question)
      }).then(function(results) {
        console.log(results);

        question.location = results.getLocation.location;
        manager.loadedPhotos.push(manager.photos.shift());

        currentIteration++;
        manager.loadPercent = (currentIteration / iterations) * 100;


        // Alright, here's the magic.
        // If this is our final iteration, currentIteration should == iterations.
        // IF that's true, all of our preloading is done.
        // Otherwise, we'll need to figure out how much time we have left to wait,
        // set a timeout, and re-invoke this function.

        if ( currentIteration === iterations ) {
          console.log("All done preloading!");
          console.log(manager.photos);
          console.log(manager.loadedPhotos);
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
          }
        }
      });
    }
  };

  this.goToNextQuestion = function() {
    this.currentPhoto   = this.loadedPhotos.shift();
    
    this.currentQuestion++;
    this.currentAnswers = this.buildAnswers();
    this.remainingQs    = this.photos.length;    
  };

  this.buildAnswers = function() {
    var right_answer  = this.currentPhoto.location,
        plucked_city1 = this.pickRandomCity(),
        plucked_city2 = plucked_city1;

    while( plucked_city1.city === plucked_city2.city ) {
      plucked_city2 = this.pickRandomCity();
    }
    var answers = _.shuffle([right_answer, plucked_city1, plucked_city2]);

    console.log("this many answers", answers.length);

    return answers;
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
