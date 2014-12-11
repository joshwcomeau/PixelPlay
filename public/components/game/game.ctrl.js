function GameController($scope, GameManager, FetchPhotos, bogusAnswers) {
  this.manager = GameManager;
  GameManager.cities  = bogusAnswers;
  GameManager.photos  = FetchPhotos.filteredPhotos;

  GameManager.initialize();
  
}


// Called in app.routes.js before the view is rendered.
GameController.resolve = {
  getPhotos: ['FetchPhotos', function(FetchPhotos) {
    return FetchPhotos.query();
  }],
  bogusAnswers: ['FetchCities', function(FetchCities) {
    return FetchCities.query().$promise;
  }]
};




GameController.prototype.pickRandomCity = function() {
  var country = _.sample(this.bogusCities);
  return _.sample(country.cities);
};


GameController.prototype.buildAnswers = function(photo_obj) {
  var answers = [],
      right_answer = photo_obj.location;

  wrong_answer_1 = '';
};


GameController.$inject = ['$scope', 'GameManager', 'FetchPhotos', 'bogusAnswers'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'GameManager', 'FetchPhotos', 'bogusAnswers', GameController]);