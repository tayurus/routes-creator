import React from "react";
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.google = window.google;
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.map = new this.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 31.85, lng: -87.65 }
        });

    }

    shouldComponentUpdate() {
        let map = new this.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 31.85, lng: -87.65 }
        });
        let google = this.google;
        var geocoder = new google.maps.Geocoder();
        if (this.props.points.length === 1) {
            /*create marker for point*/
            codeAddress(this.props.points[0]);
        } else {
            var directionsService = new google.maps.DirectionsService();

            var directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true,
                map: map
            });

            let wayPoints = [];

            for (let i = 1; i <= this.props.points.length - 1; i++) {
                wayPoints.push({ location: this.props.points[i] });
            }

            directionsService.route(
                {
                    origin: this.props.points[0],
                    waypoints: wayPoints,
                    destination: this.props.points[
                        this.props.points.length - 1
                    ],
                    travelMode: "DRIVING"
                },
                function(response, status) {
                    if (status === "OK") {
                        directionsDisplay.setDirections(response);
                        console.log(map.markers);
                    } else {
                        window.alert(
                            "Directions request failed due to " + status
                        );
                    }
                }
            );
        }

        function codeAddress(str) {
            function drawMarker(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    });
                    map.setCenter(results[0].geometry.location);
                }
            }
            geocoder.geocode({ address: str }, drawMarker);
        }

        // function initMap() {
        //     var directionsService = new google.maps.DirectionsService();
        //
        //     var map = new google.maps.Map(document.getElementById("map"), {
        //         zoom: 7,
        //         center: { lat: 41.85, lng: -87.65 }
        //     });
        // }

        // function codeAddress() {
        //     map = new google.maps.Map(document.getElementById("map"), {
        //         zoom: 7,
        //         center: { lat: 41.85, lng: -87.65 }
        //     });
        //     console.log("codeAddress");
        //     var address = document.getElementById("address").value;
        //     geocoder.geocode({ address: address }, function(
        //         results,
        //         status
        //     ) {
        //         if (status == google.maps.GeocoderStatus.OK) {
        //             map.setCenter(results[0].geometry.location);
        //             var marker = new google.maps.Marker({
        //                 map: map,
        //                 position: results[0].geometry.location
        //             });
        //         } else {
        //             console.log(
        //                 "Geocode was not successful for the following reason: " +
        //                     status
        //             );
        //         }
        //     });
        // }

        //     document.getElementById("address").oninput = codeAddress;
        //
        //     var directionsDisplay = new google.maps.DirectionsRenderer({
        //         draggable: true,
        //         map: map
        //     });
        //
        //     directionsDisplay.setMap(map);
        //
        //     var onChangeHandler = function() {
        //         calculateAndDisplayRoute(directionsService, directionsDisplay);
        //     };
        //     document
        //         .getElementById("start")
        //         .addEventListener("change", onChangeHandler);
        //     document
        //         .getElementById("waypoint")
        //         .addEventListener("change", onChangeHandler);
        //     document
        //         .getElementById("end")
        //         .addEventListener("change", onChangeHandler);
        // }
        //
        // function calculateAndDisplayRoute(
        //     directionsService,
        //     directionsDisplay
        // ) {

        // }
        // initMap();
    }

    render() {
        return (
            <div>
                <input type="text" id="address" onChange="" />
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

                <div style={{ width: "400px", height: "400px" }} id="map">
                    <span />
                </div>
            </div>
        );
    }
}
