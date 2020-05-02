import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './search.scss';
import SearchIcon from '../../Assets/Image/search.png';
import { getInitialData } from '../../Api/api';
import { initialData } from '../../Api/cartJson';

class Search extends Component {
    constructor(props) {
        super();
        this.state = { showSearchBar: false, productList: [], cartItems: [], isRootPath: false };
    }

    componentDidMount() {
        this.setState({ productList: [...this.props.productList], cartItems: [...this.props.cartItems] });
        if (this.props.location.pathname === '/') {
            this.setState({ isRootPath: true });
        } else {
            this.setState({ isRootPath: false });
        }
    }

    render() {
        return (
            <div className='searchIcon'>
                <div>
                    <img src={SearchIcon} alt='' onClick={() => { this.searchClicked() }}></img>
                </div>
                <div>
                    {
                        this.state.showSearchBar ? <input type='search' onChange={(event) => { this.search(event) }} autoFocus></input> : null
                    }
                </div>
            </div>
        )
    }

    searchClicked() {
        this.setState({ showSearchBar: !this.state.showSearchBar });
    }

    search(event) {
        if (this.state.isRootPath) {
            this.searchProduct(event);
        } else {
            this.searchCart(event);
        }
    }

    searchProduct(event) {
        let list = [...this.props.productList];
        let sortedList = [];
        if (event.target.value) {
            sortedList = list.filter((item) => {
                if (item.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    return item;
                }
                return null;
            });
        } else {
            getInitialData()
                .then(response => {
                    this.props.fetchInitialData(response.data);
                })
                .catch(error => {
                    this.props.fetchInitialData(initialData.items);
                });
            this.setState({ showSearchBar: !this.state.showSearchBar });
        }

        this.props.searchInitialData(sortedList);
    }

    searchCart(event) {
        let list = [...this.props.cartItems];
        let sortedList = [];
        if (event.target.value) {
            sortedList = list.filter((item) => {
                if (item.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    return item;
                }
                return null;
            });
        } else {
            sortedList = [...this.state.cartItems];
            this.setState({ showSearchBar: !this.state.showSearchBar });
        }

        this.props.updateCart(sortedList);
    }
}


const mapStateToProps = state => {
    return {
        productList: state.productList || [],
        consistProductList: state.consistProductList || [],
        cartItems: state.cartData || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchInitialData: payload => {
            dispatch(actionFetch(payload));
        },
        fetchInitialData: payload => {
            dispatch(actionFetch(payload));
        },
        updateCart: payload => {
            dispatch(actionUpdateCart(payload));
        },
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};

const actionUpdateCart = payload => {
    return { type: "UPDATECART", payload };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));