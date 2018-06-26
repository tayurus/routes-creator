import React from "react";
export class Map extends React.Component{
    constructor(props){
        super(props)
        console.log("constructor");
    }
    componentDidMount() {
      const google = window.google
      function initMap() {
        var directionsService = new google.maps.DirectionsService;

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
        var directionsDisplay = new google.maps.DirectionsRenderer({
         draggable: true,
         map: map
       });

        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('waypoint').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          waypoints: [{location: document.getElementById('waypoint').value}],
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      initMap()
    }

    render(){
        return (
            <div>
                <b>Start: </b>
                <select id="start">
                  <option value="Москва, ул Пушкина">Москва</option>
                  <option value="Волгоград, ул Ополченская">Волгоград</option>
                  <option value="Саратов, ул Ленина">Саратов</option>
                </select>

                <select id="waypoint">
                  <option value="Самара">Самара</option>
                  <option value="Салехард">Салехард</option>
                  <option value="Омск">Омск</option>
                </select>

                <select id="end">
                  <option value="Владивосток">Владивосток</option>
                  <option value="Новосибирск">Новосибирск</option>
                  <option value="Барнаул">Барнаул</option>
                </select>

                <div style={{width: "400px", height: "400px"}} id="map"><span></span></div>
            </div>

        );
    }
}
