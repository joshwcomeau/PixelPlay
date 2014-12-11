function FetchCities($resource) {
  return $resource('/api/cities');
}

angular.module('pixelPlay.game').factory("FetchCities", ["$resource", FetchCities]);