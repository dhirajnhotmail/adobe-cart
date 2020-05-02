import React from "react";
import { connect } from "react-redux";
import './cart.scss';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import PriceDetails from '../../Components/PriceDetails/priceDetails';
import CartItem from '../../Components/CartItem/cartItem';

class Cart extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div className='cart-main-container'>
                    <div className='left-container'>
                        <CartItem></CartItem>
                    </div>
                    <div className='right-container'>
                        <PriceDetails></PriceDetails>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
