import React, { Component } from 'react';
import { connect } from "react-redux";
import './search.scss';
import SearchIcon from '../../Assets/Image/search.png';
import { getInitialData } from '../../Api/api';
import { initialData } from '../../Api/cartJson';

class Search extends Component {
    constructor() {
        super();
        this.state = { showSearchBar: false };
    }

    render() {
        return (
            <div className='searchIcon'>
                <div>
                    <img src={SearchIcon} alt='' onClick={() => { this.searchClicked() }}></img>
                </div>
                <div>
                    {this.state.showSearchBar ?
                        <input type='search' onChange={(e) => { this.search(e) }}></input> : null
                    }</div>
            </div>
        )
    }

    searchClicked() {
        this.setState({ showSearchBar: !this.state.showSearchBar });
    }

    search(e) {
        let list = [...this.props.productList];
        let sortedList = [];
        if (e.target.value) {
            sortedList = list.filter((item) => {
                if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
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
}


const mapStateToProps = state => {
    return {
        productList: state.productList || [],
        consistProductList: state.consistProductList || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchInitialData: payload => {
            dispatch(actionFetch(payload));
        },
        fetchInitialData: payload => {
            dispatch(actionFetch(payload));
        }
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);