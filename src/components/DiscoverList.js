import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";
import {Button} from 'antd';
import {BsHeart} from "react-icons/bs";
import {BsHeartFill} from "react-icons/bs";


import InterestCard from "./InterestCard";

const ButtonGroup = Button.Group;

class DiscoverList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            places: [],
        }
        this.renderPlaces = this.renderPlaces.bind(this)
    }

    renderPlaces() {
        console.log('click --> ', this.props.places);
        this.setState({
            places: this.props.places,
        });
    }

    onClickDislike(placeName) {
        // if(this.state.likes.filter(place => place.name === placeName)){
            // this.setState({
            //     likes: this.state.likes.filter(
            //         place => place.name !== placeName
            //     )
            // });
            // return <BsHeartFill/>;
        // } else {
            // this.setState({
            //         likes: this.state.likes.filter(
            //             place => place.name !== placeName
            //         )
            //     });
            // return <BsHeart/>;
            //this.handleRemoveLike(placeName);
        // }
    }
    //
    handleRemoveLike(placeName) {
        this.setState({
                places: this.state.places.filter(
                    place => place.name !== placeName
                )
            });
    }

    render() {
        console.log('originalState --> ', this.state.places);
        console.log('propsFromCard --> ', this.props.places);
        //console.log('removeFunction --> ', this.props.removeLike);

        return (
            <div>
                <h1>Discover list</h1>
                <button onClick={this.renderPlaces}> Update list </button>
                <br />

                {this.state.places.map((place) => (
                    <div>
                        <ButtonGroup>
                            <Button>
                                {place.name}
                            </Button>
                            <Button>
                                <BsHeartFill onClick={() => {
                                    this.props.removeLike(place.name);
                                    this.handleRemoveLike(place.name);
                                }}/>
                            </Button>
                        </ButtonGroup>
                        <br />
                    </div>
                    )
                )}

                <br />

                {/*<ListGroup as="ul">*/}
                {/*    {this.state.places.map((place) => <ListGroup.Item>{place.name}</ListGroup.Item>)}*/}
                {/*</ListGroup>*/}
                {/*<ul>*/}
                {/*    {this.state.places.map((place) => <li>{place.name}</li>)}*/}
                {/*</ul>*/}

            </div>
        );
    }
}

export default DiscoverList;