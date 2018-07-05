import React from "react";
import './Map.css';
export class Map extends React.Component {
    constructor(props) {
        super(props);
        //добавляем компоненту пространтсов имен "google"
        this.google = window.google;
    }

    // первый рендер карты
    componentDidMount() {
        this.map = new this.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 31.85, lng: -87.65 }
        });
    }

    componentDidUpdate() {
        //вновь перерисовываем карту
        let map = new this.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 31.85, lng: -87.65 }
        });

        //берем про-во имен google
        let google = this.google;

        //эта штука для определения кординат по адресу
        var geocoder = new google.maps.Geocoder();

        //если у нас пока только одна точка, то просто нарисуем для нее маркер
        if (this.props.points.length === 1) {
            codeAddress(this.props.points[0]);

        } else {
            //в противном случае подготовим все нужное для построения маршрута

            //сервис построения маршрута
            var directionsService = new google.maps.DirectionsService();

            //сервис рисования маршрута
            var directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true,
                map: map
            });

            // при измении маршрута:
            directionsDisplay.addListener("directions_changed", () =>{
                let direction = directionsDisplay.getDirections();
                let newPoints = [];
                // перебираем все "ноги" маршрута для перерисовки нового маршрута
                direction.routes[0].legs.forEach(function(leg, legIndex){
                    // если "нога" первая - берем и начальную и конечную точки
                    if (legIndex == 0){
                        newPoints.push(leg['start_address']);
                        newPoints.push(leg['end_address']);
                    }else
                    // иначе - только последнюю
                        newPoints.push(leg['end_address']);
                })

                // вызов "прокинутой" из App.js функции для обновления состояния маршрута
                this.props.handlerChangeDirection(newPoints)
            });

            //промежуточные точки на случай, если маршрут состоит из более чем двух точек
            let wayPoints = [];

            //сформируем массив прмежуточных точек
            for (let i = 1; i < this.props.points.length - 1; i++) {
                wayPoints.push({ location: this.props.points[i] });
            }

            //строим маршрут
            directionsService.route(
                {
                    origin: this.props.points[0], //откуда
                    waypoints: wayPoints, //через какие точки
                    destination: this.props.points[ // куда
                        this.props.points.length - 1
                    ],
                    travelMode: "WALKING" //считаем, что идем пешочком (а хотелось бы самолетом)
                },
                function(response, status) {
                    if (status === "OK") { //если получилось построить маршрут, то строим
                        directionsDisplay.setDirections(response);
                    } else {
                        //иначе - грустим
                        window.alert(
                            "Directions request failed due to " + status
                        );
                    }
                }
            );
        }

        //функция, для которой и обьявляли geocoder - преобразует адрес с человеческого языка в коориднаты, по которым можно нарисовать маркер
        function codeAddress(str) {
            //рисует маркер
            function drawMarker(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    });
                    map.setCenter(results[0].geometry.location);
                }
            }
            //получаем координаты и рисуем с помощью drawMarker
            geocoder.geocode({ address: str }, drawMarker);
        }
    }

    render() {
        return (
            <div className="Map" id="map"></div>
        );
    }
}
