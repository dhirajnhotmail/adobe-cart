import React, { Component } from 'react';
import Product from '../Product/product';
import './shopping.scss';

export default class Shopping extends Component {
    render() {
        return (
            <div className='cartItem'>
                {this.props.productList.map((item, index) => {
                    return <Product product={item} key={index} ></Product>
                })}
            </div>
        )
    }
}
