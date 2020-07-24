import React, {useState} from 'react';
import {
    Card,
    Button,
} from 'react-bootstrap';

//import DiscoverList from "./DiscoverList";

const InterestedCard2 = (props) => {

        return (
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Img variant="top" src=""/>
                    <Card.Body>
                        <Card.Title>
                            <form className="cardTitle"
                                  onSubmit={ e => e.preventDefault()}>
                                <input
                                    type="text"
                                    placeholder="Name the location"
                                    name="locationName"
                                    onChange={e => props.onChange(e.target.value)}
                                />
                                <button>Enter</button>
                            </form>
                        </Card.Title>
                        <Card.Text>
                            passed position from App =>

                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
};

export default InterestedCard2;