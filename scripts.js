function findRoute() {
  var from = document.getElementById('from').value;
  var to = document.getElementById('to').value;

  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 37.7749, lng: -122.4194}
  });

  directionsRenderer.setMap(map);

  var request = {
    origin: from,
    destination: to,
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);

      var distance = result.routes[0].legs[0].distance.text;

      document.getElementById('distance').innerHTML = 'Distance: ' + distance;

      // Display route and markers on map
      
      var route = result.routes[0].legs[0];
      var startMarker = new google.maps.Marker({
        position: route.start_location,
        map: map,
        title: route.start_address
      });
      var endMarker = new google.maps.Marker({
        position: route.end_location,
        map: map,
        title: route.end_address
      });
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(startMarker.getPosition());
      bounds.extend(endMarker.getPosition());
      map.fitBounds(bounds);
    }
  });
}
