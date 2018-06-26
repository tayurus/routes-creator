import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './Input/Input.js';
import {List} from './List/List.js';
import {Map} from './Map/Map.js';

class App extends Component {

    constructor(props){
        super(props)
        this.handlerAdd = this.handlerAdd.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
        this.state = {points: []}
    }

    handlerAdd(phrase) {
        let pointsNew = this.state.points;
        pointsNew.push(phrase);
        this.setState({points: pointsNew});
    }

    handlerDelete(id) {
        let pointsNew = this.state.points;
        pointsNew.splice(id, 1);
        this.setState({points: pointsNew});
    }

  render() {
    return (
      <div className="App">
          <div>
              <Input handlerAdd={this.handlerAdd}/>
              <List points={this.state.points} handlerDelete={this.handlerDelete}/>
          </div>
          <Map/>
      </div>
    );
  }
}

export default App;
