function GameController($scope, GameManager, FetchPhotos, bogusAnswers) {
  this.manager = GameManager;
  GameManager.photos  = FetchPhotos.filteredPhotos;
  GameManager.countriesAndCities  = bogusAnswers;

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


GameController.$inject = ['$scope', 'GameManager', 'FetchPhotos', 'bogusAnswers'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'GameManager', 'FetchPhotos', 'bogusAnswers', GameController]);