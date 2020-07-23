import React, {Component} from 'react';
import { Input } from 'antd';
import {Link} from "react-router-dom";










const { Search } = Input;





class SearchForm extends Component {
    render() {
        return (
            <div className="search">
                <div>


                    <Link to= "/map">><Search placeholder="search a city" onSearch={value => console.log(value)} enterButton /></Link>

                </div>,
            </div>
        );
    }
}

export default SearchForm;