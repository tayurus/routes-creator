import React, { Component } from "react";
import "./App.css";
import { Input } from "./Input/Input.js";
import { List } from "./List/List.js";
import { Map } from "./Map/Map.js";

class App extends Component {
    constructor(props) {
        super(props);
        //привязка контекста
        this.handlerAddPoint = this.handlerAddPoint.bind(this);
        this.handlerDeletePoint = this.handlerDeletePoint.bind(this);
        this.handlerChangeDirection = this.handlerChangeDirection.bind(this);

        //начальное состояние - точек нет
        this.state = { points: [] };
    }

    //функция для добавления точек в состояние
    handlerAddPoint(phrase) {
        let pointsNew = this.state.points;
        pointsNew.push(phrase);
        this.setState({ points: pointsNew });
    }

    //функция для удаления точек из состояния
    handlerDeletePoint(id) {
        let pointsNew = this.state.points;
        pointsNew.splice(id, 1);
        this.setState({ points: pointsNew });
    }

    //функция для изменения маршрута (списка точек)
    handlerChangeDirection(newPoints) {
        let currentPoints = this.state.points;

        //флаг - нужно ли изменять состояние
        let updateState = false;

        //проверим, есть ли новые точки в newPoints
        currentPoints.forEach(function(point){
            if (!newPoints.includes(point))
                updateState = true;
        })

        /// если есть = обновим состояние
        if (updateState)
            this.setState({ points: newPoints });
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Input handlerAddPoint={this.handlerAddPoint} />
                    <List
                        points={this.state.points}
                        handlerDeletePoint={this.handlerDeletePoint}
                    />
                </div>
                <Map
                    handlerChangeDirection={this.handlerChangeDirection}
                    points={this.state.points}
                />
            </div>
        );
    }
}

export default App;
