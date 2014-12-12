// // Written by Joshua Comeau

// angular.module('pixelPlay')
// .factory('ReverseGeocoder', ['$q', '$interval', function($q, $interval) {
//   var pauseLength = 500,
//       geocoder    = new google.maps.Geocoder(),
//       deferred    = $q.defer(),
//       currentLocation, latLng;


//   var getCityAndCountry = function(geoResults) {
//     var components = geoResults[0].address_components,
//         city = [], 
//         country;

//     // In the Maps API, 'localities' are cities. Not all areas have one though.
//     // Localities will be 'unshifted' (pushed to the FRONT)
//     // All administrative_areas will be pushed (to the BACK)
//     // That way, we can just take the first member of the array to act as our city;

//     _.forEach(components, function(c) {
//       if ( c.types[0] === 'locality' )
//         city.unshift(c.long_name);
//       else if ( c.types[0].substr(0, 19) === 'administrative_area')
//         city.push(c.long_name);
//       else if ( c.types[0] === 'country' )
//         country = c.long_name;
//     });
//     console.log("City is ", city, " and country is ", country);
//     return {
//       city:     city[0],
//       country:  country
//     };
//   };

//   var getLocation = function(lat, lng, i) {
//     latLng = new google.maps.LatLng(lat, lng);

//     geocoder.geocode({'latLng': latLng}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         if (results[1]) {
//           deferred.notify({
//             location: getCityAndCountry(results),
//             index:    i
//           });
//         } else {
//           alert('No results found');
//         }
//       } else {
//         alert('Geocoder failed due to: ' + status);
//       }
//     });
//   };

//   return {
//     getLocations: function(arr) {
//       var iterations    = arr.length - 1,
//           currentIndex  = 0;

//       $interval(function() {
//         getLocation(arr[currentIndex].latitude, arr[currentIndex].longitude, currentIndex);
//         currentIndex++;
//       }, pauseLength, iterations);



//       return deferred.promise;
//     }
//   };
// }]);