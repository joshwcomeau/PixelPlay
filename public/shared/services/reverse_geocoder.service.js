// Written by Joshua Comeau

angular.module('pixelPlay')
.factory('ReverseGeocoder', ['$q', '$interval', function($q, $interval) {
  var pauseLength = 200,
      geocoder    = new google.maps.Geocoder(),
      deferred      = $q.defer(),
      currentLocation, latLng;


  var getCityAndCountry = function(geoResults) {
    var components = geoResults[0].address_components,
        city, country;

    _.forEach(components, function(c) {
      if ( c.types[0] === 'locality' )
        city = c.long_name;
      else if ( c.types[0] === 'country' )
        country = c.long_name;
    });
    deferred.notify({
      city:     city,
      country:  country
    });
  }

  var getLocation = function(lat, lng) {
    latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          getCityAndCountry(results);
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  };

  return {
    getLocations: function(arr) {
      var iterations    = arr.length,
          currentIndex  = 0;

      $interval(function() {
        currentLocation = getLocation(arr[currentIndex].latitude, arr[currentIndex].longitude)        
        currentIndex++;
      }, 1000, 4);



      return deferred.promise;
    }
  }
}]);