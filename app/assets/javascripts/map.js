
var map;
var markers =[];

function initialize(){

  var mapOptions = {
    center: new google.maps.LatLng(37.7933, -122.3167),
    zoom: 16
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var start_marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Start',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        draggable:true
      });

      markers.push(start_marker);

      var end_marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Stop',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        draggable:true
      });
      markers.push(end_marker);
    });
  }
}
//$(document).on('ready page:load', initialize);

