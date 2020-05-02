import React, { Component } from 'react';
import { connect } from "react-redux";
import './cartItem.scss';

class CartItem extends Component {
    render() {
        return (
            <div>
                {this.props.cartItems.map((item, index) => {
                    return (<div key={index} className='cart-item'>
                        <div><img src={item.image} alt=''></img></div>
                        <div>
                            <div className='product-name'>{item.name}</div>
                            <div className='price-details-cart'>
                                <span><b>&#x20B9;{item.price.display}</b></span>
                                <span className='actual-price'><del>{item.price.actual}</del></span>
                                <span className='discount'>{item.discount}% off</span>
                            </div>
                        </div>
                        <div className='product-quantity'>
                            <span className='minus' onClick={() => { this.quantityMinus(item) }}>-</span>
                            <span className='quantity'><b>{item.quantity}</b></span>
                            <span className='plus' onClick={() => { this.quantityPlus(item) }}>+</span>
                        </div>
                        <div className='product-remove' onClick={() => { this.removeItem(item) }}><b>Remove</b></div>
                    </div>);
                })}

                {this.props.cartItems.length === 0 ? <div className='cart-item'></div> : null}
                <div className='clear-both'></div>
            </div>
        )
    }

    componentDidMount() {
        this.recalculatePrice(this.props.cartItems);
    }

    quantityMinus = function (item) {
        if (item.quantity > 1) {
            let cartData = [...this.props.cartItems];
            cartData.map((i) => {
                if (i.name === item.name) {
                    i.quantity = item.quantity - 1;
                }
                return i;
            });
            this.props.updateCart(cartData);
        }
        this.recalculatePrice(this.props.cartItems);
    }

    quantityPlus = function (item) {
        let cartData = [...this.props.cartItems];
        cartData.map((i) => {
            if (i.name === item.name) {
                i.quantity = item.quantity + 1;
            }
            return i;
        });
        this.props.updateCart(cartData);
        this.recalculatePrice(this.props.cartItems);
    }

    removeItem = function (item) {
        let cartData = [...this.props.cartItems];
        let remainedData = cartData.filter((i) => {
            if (i.name !== item.name) {
                return i;
            }
            return null;
        });
        this.props.updateCart(remainedData);
        this.recalculatePrice(remainedData);
    }

    recalculatePrice = function (addedItems) {
        let data = {
            price: 0,
            discount: 0,
            total: 0
        };

        addedItems.map((item) => {
            data.price += (item.price.actual + item.price.display) * item.quantity;
            data.discount += item.price.actual * item.quantity;
            data.total += item.price.display * item.quantity;
            return null;
        });
        this.props.updatePrice(data);
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartData || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCart: payload => {
            dispatch(actionUpdateCart(payload));
        },
        updatePrice: payload => {
            dispatch(actionUpdatePrice(payload));
        }
    };
};

const actionUpdateCart = payload => {
    return { type: "UPDATECART", payload };
};

const actionUpdatePrice = payload => {
    return { type: "UPDATEPRICE", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);