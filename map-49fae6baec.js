var map;
function initMap() {
    var mapCenter = {lat: 56.947693, lng: 24.124859};
    var streetStart = {lat: 56.94802, lng: 24.12463};
    var streetEnd = {lat: 56.94768, lng: 24.124783};
    var entrance = {lat: 56.94765, lng: 24.1249};
    var iconPosition = {lat: 56.947593, lng: 24.125};
    var control = document.getElementById('navigationPanel');
    var startInput = document.getElementById('pac-input');
    var endInput = document.getElementById('end');
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        mapTypeId: "roadmap",
        zoom: 18
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions'));
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    var autocomplete = new google.maps.places.Autocomplete(startInput);
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        var place = autocomplete.getPlace();
        onChangeHandler();
        console.log(place);
    });

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    document.getElementById('mode').addEventListener('change', onChangeHandler);
    startInput.addEventListener('change', onChangeHandler);

    new google.maps.Polyline({
        path: [streetStart, streetEnd, entrance],
        strokeColor: '#FF0000',
        strokeOpacity: .5,
        strokeWeight: 4,
        icons: [
            {
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                }
            }
        ],
        map: map
    });
    new google.maps.Marker({
        position: iconPosition,
        icon: "/static/img/logo_m.png?3",
        title: "Sia Lanser",
        animation: google.maps.Animation.BOUNCE,
        map: map
    });

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = document.getElementById('pac-input').value;
        var end = document.getElementById('end').value;
        var mode = document.getElementById('mode').value;
        directionsService.route({
            origin: start,
            destination: end,
            travelMode: mode
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }
}