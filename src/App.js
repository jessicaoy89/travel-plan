import React, { Component } from 'react'
import Map from './Map'
import Tag from './SlidingTag'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import List from './DraggableList'

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      plan: [['chicago', 'champaign'],['chicago','evenston']],
      currDay: 0,
    };
    
  }

  onUpdateDate(newDay) {
    this.setState({currDay:newDay});
    console.log("current = ", this.state.currDay);
  }

  render() {
    return (
        <div>
          <Map plan = {this.state.plan}  day = {this.state.currDay}/>
          <Tag plan = {this.state.plan} day = {this.state.currDay} update = {this.onUpdateDate.bind(this)}/>
          <List plan = {this.state.plan} day = {this.state.currDay}/>
        </div>
      
    )
  }
}
