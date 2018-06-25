import React from "react";
import {Point} from '../Point/Point'

export class List extends React.Component{
    constructor(props){
        super(props);


    }

    render(){
        return (
            <div className="List">
                {
                    this.props.points.map((address, i) => <Point address={address} id={i} handlerDelete={this.props.handlerDelete}/>)
                }
            </div>
        )
    }
}
