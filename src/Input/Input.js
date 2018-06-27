import React, { Component } from 'react';
import './Input.css';

export class Input extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="Input">
                <input defaultValue="Москва" type="text" className="Input__field" placeholder="Type address here..." ref="point"/>
                <button className="Input__button" onClick={()=>this.props.handlerAdd(this.refs.point.value)}>Add address</button>
            </div>
        )
    }
}
