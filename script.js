$(document).ready(function(){

var map;
var geocoder = new google.maps.Geocoder();
var lat;
var long;
var location;
var poly;
var path = [];

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
   poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1,
          strokeWeight: 2
        });
        poly.setMap(map);
        map.addListener('click', addLatLng);
      }

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  path = poly.getPath();
  path.push(event.latLng);
}

 $("#search").click(function(){
  codeAddress();
});
  
$("done").click(function(){
var newCenter = map.getCenter();
lat = newCenter.lat();
long = newCenter.lng();
console.log(path);
})




        
      


    })