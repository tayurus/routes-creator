import React, { Component } from "react";
import "./Input.css";

// компонент для ввода очередной точки маршрута

export class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Input">
                <input
                    defaultValue="Москва"
                    type="text"
                    className="Input__field"
                    placeholder="Type address here..."
                    ref="point"
                    onKeyPress={(e) => this.props.handleKeyPress(e,this.refs.point.value)}
                />
                <button
                    className="Input__button"
                    onClick={() =>
                        this.props.handlerAddPoint(this.refs.point.value)
                    }
                >
                    Add address
                </button>
            </div>
        );
    }
}
