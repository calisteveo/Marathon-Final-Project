
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
// var haight = new google.maps.LatLng(37.7699298, -122.4469157);
// var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
// var markers =[];
// var route = [];

function initialize(){
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var mapOptions = {
    center: new google.maps.LatLng(37.7933, -122.3167),
    zoom: 12
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

  function calcRoute() {
    var start = document.getElementById("origin").value;
    var end = document.getElementById("destination").value;
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(result, status){
      if (status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(result);
      }
    });
  }

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    });
    //   var start_marker = new google.maps.Marker({
    //     position: pos,
    //     map: map,
    //     title: 'Start',
    //     icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    //     draggable:true
    //   });

    //   markers.push(start_marker);

    //   var end_marker = new google.maps.Marker({
    //     position: pos,
    //     map: map,
    //     title: 'Stop',
    //     icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    //     draggable:true
    //   });
    //   markers.push(end_marker);
    // });
  }
google.maps.event.addDomListener(window, 'load', initialize);

calcRoute();
