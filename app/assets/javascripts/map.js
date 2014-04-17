
var rendererOptions = {
  draggable: true
};

var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var elevator = new google.maps.ElevationService();
var map;
var service;
var geocoder;
var elevator;
var chart;
var infowindow = new google.maps.InfoWindow();
var polyline;

google.load('visualization', '1', {packages: ['columnchart']});

function initialize(){

  var san_francisco = new google.maps.LatLng(37.7933, -122.3167);
  
  var mapOptions = {
    center: san_francisco,
    zoom:12,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_LEFT
    },
    panControl: false,
    panControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // Clean Cut from Snazzy Maps
    styles:[{"featureType":"road", "elementType": "geometry", "stylers": [{"lightness": 100}, {"visibility": "simplified"}]},{"featureType": "water", "elementType": "geometry", "stylers": [{"visibility": "on"},{"color": "#C6E2FF"}]},{"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"color": "#C5E3BF"}]},{"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#D1D1B8"}]}]
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  var updateForm = function(){
    var $start = $("#start");
    var $end = $("#end");
    var $distance = $(".adp-summary").children().contents()[0];

    $("#form_start").val($start.val());
    $("#form_end").val($end.val());
    $("#distance").val($distance.val());
      console.Log(distance);
    $("#waypoints").empty();

    var dir = directionsDisplay.getDirections();
    // grabbing waypoints
    dir.routes[0].legs[0].via_waypoints.forEach(function(waypoint, index){
      // for each waypoint pass the lattitude(d) and longitude(e) to the form which is then saved.
      $("#new_journey #waypoints").append("<input type='hidden' name='journey[waypoint]["+index+"][d]' value='"+waypoint.d+"'>");
      $("#new_journey #waypoints").append("<input type='hidden' name='journey[waypoint]["+index+"][e]' value='"+waypoint.e+"'>");
    });
  };
  google.maps.event.addListener(directionsDisplay, 'directions_changed', function(){
    console.log(directionsDisplay.getDirections());
    updateForm();
    createLatLngList(directionsDisplay.getDirections());
  });

  calcRoute();

  drawPath();

  var banoRequest = {
    location: san_francisco,
    radius: '500',
    types: ['restroom', 'coffee shop', 'drinking fountain']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(banoRequest, callback);
}

  function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status){
      if (status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
        showSaveBtn(status);
      }
    });
  }

  function showSaveBtn(status){
    if (status == google.maps.DirectionsStatus.OK && $('#signin').length !== 1){
      document.getElementById('save_btn').classList.remove('hidden');
    }
    else if (status == google.maps.DirectionsStatus.OK && $('#signin').length === 1){
      document.getElementById('please').classList.remove('hidden');
    }
  }

  function createLatLngList(result){
    var total = 0;
    var latlngList = [];
    var myroute = result.routes[0].legs[0];
    for (var i = 0; i < myroute.steps.length; i++) {
      latlngList.push(myroute.steps[i].end_location);
    }
    drawPath(latlngList);
  }

  function drawPath(list) {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    // Create a new chart in the elevation_chart div
    chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
  
    var path = [];
    if (list !== undefined){
      for (var i = 0; i < list.length; i++) {
        path.push(new google.maps.LatLng(list[i].d, list[i].e));
      }
      console.log("This is the list:", list);
    }

    // Create PathElevationRequest object using this array and ask for 25 samples along path
    var pathRequest = {
      'path': path,
      'samples': 25
    };

    // Initiate the path request
    elevator.getElevationAlongPath(pathRequest, plotElevation);
  }

  // Takes array of ElevationResult objects and draws the path on the map
  // and plots the elevation profile on a visualization API ColumnChart.
  function plotElevation(results, status) {
    if (status != google.maps.ElevationStatus.OK){
      return;
    }
    var elevations = results;

    var elevationPath = [];
    for (var i = 0; i < results.length; i++) {
      elevationPath.push(elevations[i].location);
    }

    // Extract the data to populate the chart with.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < results.length; i++) {
      data.addRow(['', elevations[i].elevation]);
    }

    var options = {
      titleY: 'Elevation (m)',
      height: 150,
        legend: 'none',
        backgroundColor: 'rgba(127, 140, 141,0.6)',
        colors:['#480082', '#34DDDD', 'red'],
        fontName: 'Open Sans',
        animation:{
          duration: 1000,
          easing: 'linear'
        }
    };

    // Draw the chart using the data within its div.
    document.getElementById('elevation_chart').style.display = 'block';
    chart.draw(data, options);
  }

  $(document).on('ready page:load', initialize);

  // makes a new map with saved routes
  function calcMyRoute(){
    var my_start = document.getElementById('my-start').innerHTML;
    var my_end = document.getElementById('my-end').innerHTML;

    var waypts = [];
    var checkboxArray = eval(document.getElementById("waypoints").innerHTML);
    console.log(checkboxArray);

    var my_path = [];
    for (var i = 0; i < checkboxArray.length; i+=2) {
      my_path.push({location: new google.maps.LatLng(checkboxArray[i], checkboxArray[i+1]),
        stopover:true
      });
    }
    console.log(my_path);

    var request = {
      origin: my_start,
      waypoints: my_path,
      destination: my_end,
      travelMode: google.maps.TravelMode.WALKING
    };
    console.log(request);

    // directionsService.route(request, function(response, status){
    //   if (status == google.maps.DirectionsStatus.OK) {
    //     directionsDisplay.setDirections(response);
    //     console.log(status);
    //     console.log(response);
    //   }
    // });
    drawPath(my_path);
  }
  // Adding geolocation function
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    });

    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var position;

    var infowindow = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'Location found using HTML5.'
    });
    
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
