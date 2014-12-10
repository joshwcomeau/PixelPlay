angular.module('pixelPlay.game').factory("FetchPhotos", ['$http', function($http) {
  
  return $http.get('https://api.500px.com/v1/photos?feature=popular&consumer_key=17uTxhkeBo1uf94kxp75OxlsIiVoHBm5EkpDuVxH').
    success(function(data, status, headers, config) {
      alert('There are ' + data.photos.length + ' photos.');
    }).
    error(function(data, status, headers, config) {
      
    });
}]);