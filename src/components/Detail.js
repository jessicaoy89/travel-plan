import React, {Component} from 'react';
import CardDetail from "./CardDetail";
import CommentInput from "./CommentInput"
class Detail extends Component {
    render() {
        return (
            <div>
                <CardDetail/>
                <CommentInput/>
            </div>
        );
    }
}

export default Detail;