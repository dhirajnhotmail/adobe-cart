import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Search from '../Search/search';
import Cart from '../Cart/cart';
import Icon from '../../Assets/Image/logo.png';

import './header.scss';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='icon'><Link to="/"><img src={Icon} alt=''></img></Link></div>
                <div className='search-bar'><Search></Search></div>
                <div className='cart-icon'><Cart></Cart></div>
            </div>
        )
    }
}
