import React, { Component } from 'react'
import Map from './Map'
import Tag from './SlidingTag'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import List from './DraggableList'
// import { Button } from 'antd';
import Button from './PlanButton'


const places = ['chicago', 'new york', 'boston']
const places1 = ['chicago', 'new york', 'boston','champaign']
export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      plan: [['chicago', 'new york', 'boston','champaign'], ['chicago', 'new york', 'boston']],
      currDay: 0,
    };
    
  }

  onUpdateDate(newDay) {
    this.setState({currDay:newDay});
    console.log("current = ", this.state.currDay);
  }

  onUpdateList(arr){
    let totalPlan = this.state.plan;
    let day = this.state.currDay;
    totalPlan[day] = arr;
    this.setState({
      plan: totalPlan,
    });
  }

  render() {
    return (
        <div>
          <Map plan = {this.state.plan}  day = {this.state.currDay} />
          <List plan = {this.state.plan} day = {this.state.currDay}  update = {this.onUpdateList.bind(this)} />
          <Tag plan = {this.state.plan} day = {this.state.currDay} update = {this.onUpdateDate.bind(this)} />
          <Button />
        </div>
      
    )
  }
}
