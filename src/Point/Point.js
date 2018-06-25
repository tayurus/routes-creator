import React from "react";
import './Point.css';

export class Point extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="Point">
                <div className="Point__text">{this.props.address}</div>
                <button className="Point__remove" onClick={() => this.props.handlerDelete(this.props.id)}/>
            </div>
        )
    }
}
