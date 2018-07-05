import React from "react";
import './Point.css';

//функциональный компонент - точка в маршруте (списке)
export const Point = (props) => {
    return (
        <div className="Point">
            <div className="Point__text">{props.address}</div>
            <button className="Point__remove" onClick={() => props.handlerDeletePoint(props.id)}/>
        </div>
    )
}
