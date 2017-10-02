$(document).ready(function(){

var map;
var geocoder = new google.maps.Geocoder();
var path = new google.maps.MVCArray();
var service = new google.maps.DirectionsService();
var lat;
var long;
var location;
var directions = [];
var pathResults = [];
var step = $(".step")
var poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });


getLocation();



//find the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Uh oh! Geolocation is not supported by this browser.");
    }
}


// if geolocation is successful, set variables to their location and call the showMap function and
function success(pos) {
  location = pos.coords;
  lat = location.latitude;
  long = location.longitude;
  showMap();
  poly.setMap(map);
  draw();
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};


function showMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: lat, lng: long},
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true
  });
  var marker = new google.maps.Marker({
          map: map,
          position: map.getCenter(),
        });
}

//geolocate an address, convert to LatLng
function codeAddress() {
    var address = $("#choose-location").val();
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      };
      });
    };

function draw(){
google.maps.event.addListener(map, "click", function(evt) {
    if (path.getLength() === 0) {
      path.push(evt.latLng);
      poly.setPath(path);
    } else {
      service.route({
        origin: path.getAt(path.getLength() - 1),
        destination: evt.latLng,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          console.log(result);
          pathResults.push(result.routes[0].overview_path);
          directions.push(result.routes[0].summary);
          for (var i = 0; i < result.routes[0].overview_path.length; i++) {
            path.push(result.routes[0].overview_path[i]);
            }
            printDirections(); 
        
          }
      });
    }
  });
}
 

function printDirections(){
   for (var i= 0; i < directions.length; i++){
            step.clone().insertAfter(step);
            $(step).text(directions[i]);
        }
};

   

 $("#search-button").click(function(){
  codeAddress();
});
  





        
      


    })