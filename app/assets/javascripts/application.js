// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require handlebars.runtime
//= require_tree .

// this is from the maps tutorial
var gdir, startAddress, endAddress;

$(document).on('ready page:load', function(){

  $("#ebtn").on('click', function(e){
    e.preventDefault();
    showjourneys();
  });

    $("#content").on('click', ".journey", function(){
      var id= $(this).data('id');
      $.get("/journeys/"+id+".json").done(function(data){
        var journeyHTML = HandlebarsTemplates.journey(data);
        $("#content").empty();
        $("#content").append(journeyHTML);
        initialize_map.apply(data);
        var map = $("#map-canvas-"+id);
          map.show();
        $(".ind_journey").append(map);
      });
    });

    $("#content").on("click", ".signout", function(e){
      e.preventDefault();
      $.get("/users/sign_out").done(function(){
        location.href="/";
      });
    });

    function initialize_map() {
      var id= this.id;
      var latlng = new google.maps.LatLng(this.lat, this.lng);
      var mapOptions = {
        zoom: 16,
        center: latlng,
        mapTypeControl: false
      };
      var map = new google.maps.Map(document.getElementById("map-canvas-"+id), mapOptions);
      var marker = new google.maps.Marker({
        map: map,
        position: latlng
      });
    }

    function showjourneys(){
      $("#content").empty();
      var journeys = $("<div class=\"centered\" id=\"journeys\"><a id=\"newjourney_link\"><button id=\"newjourneybtn\"> New Journey </button></a></div>");
      var journey_list = $("<div id=\"journey_container\"></div>");
      $.get("/journeys.json").done(function(data){

      if (data[0] !== null) {
        $(data).each(function(index, journey){
          var journeysHTML = HandlebarsTemplates.journeys(journey);
          journey_list.append(journeysHTML);
        });
        journeys.append(journey_list);
        $("#content").append(journeys);
      } else{
        journey_list.append("<p>You haven't gone anywhere!</p>");
        journeys.append(journey_list);
        $("#content").append(journeys);
      }
      });
    }

    showjourneys();
});