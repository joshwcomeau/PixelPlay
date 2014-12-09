angular.module('pixelPlay.score').factory("Score", ["$resource", function($resource) {
  return $resource('/api/scores/:id');
}]);