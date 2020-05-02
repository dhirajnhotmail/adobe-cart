import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './cart.scss';
import CartIcon from '../../Assets/Image/cart.png';

class Cart extends Component {
    render() {
        return (
            <div className='cartIcon'>
                <Link to="/Cart"><span className='cartCount'>{this.props.cartItems.length}</span><img src={CartIcon} alt=''></img></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productList || [],
        sortType: state.sortType || '',
        cartItems: state.cartData || []
    };
};

export default connect(mapStateToProps)(Cart);