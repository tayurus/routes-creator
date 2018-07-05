import React from "react";
import { Point } from "../Point/Point";

//компонент-список точек маршрута
export const List = (props) => {
    return (
        <div className="List">
            {props.points.map((address, i) => (
                <Point
                    address={address}
                    id={i}
                    handlerDeletePoint={props.handlerDeletePoint}
                />
            ))}
        </div>
    );
}
