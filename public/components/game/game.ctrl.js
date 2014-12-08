function GameController($scope) {
  this.tagline = "I'm such a Thing.";
}

GameController.prototype.someMethod = function() {};

GameController.$inject = ['$scope'];
angular.module('pixelPlay.things').controller('GameController', ['$scope', GameController]);