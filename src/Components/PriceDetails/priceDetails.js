import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './priceDetails.scss';

class PriceDetails extends Component {
    render() {
        return (
            <div>
                <div className='price-detail-cart'>
                    <div className='label'><b>PRICE DETAILS</b></div>
                    <div>Price : <span className='right'>{this.props.cartPrice.price}</span></div>
                    <div>Discount  :<span className='right'>{this.props.cartPrice.discount}</span></div>
                    <div className='total'><b>Total Payable<span className='right'>{this.props.cartPrice.total}</span></b></div>
                    <div className='clear-both'></div>
                </div>
                <div className='continue-shopping'><Link to="/">Continue Shopping</Link></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartPrice: state.cartPrice || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetails);
