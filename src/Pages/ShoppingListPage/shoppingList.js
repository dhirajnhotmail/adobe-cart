import React from "react";
import { connect } from "react-redux";

import Header from '../../Components/Header/header';
import Sort from '../../Components/Sort/sort';
import Shopping from '../../Components/Shopping/shopping';
import Filter from '../../Components/Filter/filter';
import Footer from '../../Components/Footer/footer';
import './shoppingList.scss';
import { getInitialData } from '../../Api/api';
import { initialData } from '../../Api/cartJson';

class ShoppingList extends React.Component {
    componentDidMount() {
        getInitialData()
            .then(response => {
                this.props.fetchInitialData(response.data);
            })
            .catch(error => {
                this.props.fetchInitialData(initialData.items);
            });
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className='main-container'>
                    <div className='left-container'><Filter></Filter></div>
                    <div className='right-container'>
                        <Sort></Sort>
                        <Shopping productList={this.props.productList}></Shopping>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productList || [],
        sortType: state.sortType || '',
        cartItems: state.cartData || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInitialData: payload => {
            dispatch(actionFetch(payload));
        }
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
