function GameController($scope, GameManager, FetchPhotosFrom500px, bogusAnswers) {
  this.manager = GameManager;
  GameManager.countriesAndCities  = bogusAnswers;

  GameManager.initialize();
  
}




// Called in app.routes.js before the view is rendered.
GameController.resolve = {
  bogusAnswers: ['FetchCities', function(FetchCities) {
    return FetchCities.query().$promise;
  }]
};


GameController.$inject = ['$scope', 'GameManager', 'FetchPhotosFrom500px', 'bogusAnswers'];
angular.module('pixelPlay.game').controller('GameController', ['$scope', 'GameManager', 'FetchPhotosFrom500px', 'bogusAnswers', GameController]);