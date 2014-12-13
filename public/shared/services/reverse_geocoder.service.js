// Written by Joshua Comeau

angular.module('pixelPlay')
.factory('ReverseGeocoder', ['$q', '$interval', function($q, $interval) {
  var pauseLength = 500,
      geocoder    = new google.maps.Geocoder(),
      currentLocation, latLng;


  var getCityAndCountry = function(geoResults) {
    var components = geoResults[0].address_components,
        city = [], 
        country, lat, lng, latLng;

    // In the Maps API, 'localities' are cities. Not all areas have one though.
    // Localities will be 'unshifted' (pushed to the FRONT)
    // All administrative_areas will be pushed (to the BACK)
    // That way, we can just take the first member of the array to act as our city;

    _.forEach(components, function(c) {
      if ( c.types[0] === 'locality' )
        city.unshift(c.long_name);
      else if ( c.types[0].substr(0, 19) === 'administrative_area')
        city.push(c.long_name);
      else if ( c.types[0] === 'country' )
        country = c.long_name;
    });
    return {
      city:     city[0],
      country:  country
    };
  };

  return {
    getLocation: function(photo_obj) {
      var lat       = photo_obj.latitude,
          lng       = photo_obj.longitude,
          latLng    = new google.maps.LatLng(lat, lng),
          deferred  = $q.defer();

      geocoder.geocode({'latLng': latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log('results ok');
          if (results[1]) {
            console.log(getCityAndCountry(results));
            deferred.resolve({
              location: getCityAndCountry(results)
            });
          } else {
            alert('No results found');
            deferred.reject({
              location: null
            });
          }
        } else {
          console.log("Results not ok");
          alert('Geocoder failed due to: ' + status);
          deferred.reject({
            location: null
          });
        }
      });

      return deferred.promise;
    }
  };
}]);