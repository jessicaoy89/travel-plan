import React, {Component} from 'react';
import { Input } from 'antd';
import {Link, Redirect} from "react-router-dom";
import Home from "./Home"
import { withRouter } from 'react-router-dom';










const { Search } = Input;





class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state={};
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick(event){
      console.log(this.props.history)
        this.props.history.push('/map')
    }


    render() {
        return (
            <div className="search">
                <div>


                  <Search placeholder="search a city" onSearch={this.handleClick} enterButton='search' />


                </div>,
            </div>
        );
    }
}

export default withRouter(SearchForm);