
import React, {Component} from 'react';
import Register from "./Register"
import NavBar from "./NavBar";
import Login from "./Login";
import {Switch, Route,Redirect} from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail"
import Map from "./Map";
import Search from "./Search";

class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/search"/> : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }
    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }
    getDetail = () => {
        return this.props.isLoggedIn ? <Detail/> : <Redirect to="/login"/>;
    }
    getMap = () => {
        return this.props.isLoggedIn ? <Map/> : <Redirect to="/login"/>;
    }
    getSearch = () => {
        return this.props.isLoggedIn ? <Search/> : <Redirect to="/login"/>;
    }

    render() {
        return (
            <div className="main">

                <Switch>
                    <Route path="/register" component={Register}/>

                    <Route path="/detail" render={this.getDetail}/>
                    <Route path="/map" render={this.getMap}/>
                    <Route path="/login" render={this.getLogin}/>

                    <Route path="/home" render={this.getHome}/>
                    <Route path= '/search' render={this.getSearch} />
                    <Route render={this.getLogin}/>
                </Switch>


            </div>
        );
    }
}

export default Main;
