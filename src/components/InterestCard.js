import React, {Component} from 'react';
import {
    Card,
    Button,
} from 'react-bootstrap';

import DiscoverList from "./DiscoverList";

export default class InterestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: '',
            position: '',
        }
    }

    handleSubmit = (e) => {
        console.log('submit --> ', e.target.value);
        e.preventDefault();
        const data = this.state;
        console.log('data --> ', data);
    }

    handleInputChange = (e) => {
        console.log('change --> ', e.target.value);
        console.log('propsFromInput --> ', this.props);
        e.preventDefault();
        this.setState(
            {
                locationName: e.target.value,
                //[e.target.name]: e.target.value,
                position: this.props.position,
            },
            () => {
                console.log('setState --> ', this.state);
            }
        )
    };

    render() {
        //console.log('props --> ', this.props);
        //console.log('user --> ', this.props.user);
        //console.log('position --> ', this.props.position);

        const {locationName} = this.state.locationName;
        return (
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Img variant="top" src=""/>
                    <Card.Body>
                        <Card.Title>
                            <form className="cardTitle"
                                  onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Name the location"
                                    name="locationName"
                                    onChange={this.handleInputChange}
                                />
                                <button onClick={()=>this.props.setState(this.state.locationName)}>Enter</button>
                            </form>
                        </Card.Title>
                        <Card.Text>
                            passed position from App => {locationName}
                            <p>

                            </p>
                            {/*{position.map((pos) => <li>{position}</li>)}*/}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
