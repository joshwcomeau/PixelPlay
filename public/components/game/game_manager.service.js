angular.module('pixelPlay.game').service('GameManager', function() {
  this.score = 0;
  
  // Possible states are 'initial', 'waiting', 'running', 'finished', 'error'
  this.state = 'initial';

});