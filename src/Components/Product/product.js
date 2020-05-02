import React, { Component } from 'react';
import { connect } from "react-redux";
import './product.scss';

class Product extends Component {
    render() {
        return (
            <div className='product'>
                <img src={this.props.product.image} alt=''></img>
                <div className='product-name'>{this.props.product.name}</div>
                <div className='price-details'>
                    <span><b>&#x20B9;{this.props.product.price.display}</b></span>
                    <span className='actual-price'><del>{this.props.product.price.actual}</del></span>
                    <span className='discount'>{this.props.product.discount}% off</span>
                </div>
                <div id='add-to-cart' onClick={() => { this.addToCart(this.props.product) }}>Add To Cart</div>
            </div>
        )
    }

    addToCart = function (product) {
        product.quantity = 1;
        this.props.addToCart(product);
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: payload => {
            dispatch(actionAddToCart(payload));
        }
    };
};

const actionAddToCart = payload => {
    return { type: "ADDTOCART", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);