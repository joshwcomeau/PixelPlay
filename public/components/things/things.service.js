angular
  .module('pixelPlay.things')
  .service("thingService", ['$resource', function($resource) {
    return $resource('/api/things');
}]);