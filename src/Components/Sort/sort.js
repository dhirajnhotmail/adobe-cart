import React, { Component } from 'react';
import { connect } from "react-redux";
import './sort.scss';

class Sort extends Component {

    constructor() {
        super();
        this.state = {
            high: '',
            low: '',
            discount: ''
        };
    }

    render() {
        return (
            <div className='sort'>
                <div className='desktop-sort'>
                    <span><b>Sort By</b></span>
                    <span className={this.state.high} onClick={() => this.selectedSortType('High')}>Price -- Hight Low</span>
                    <span className={this.state.low} onClick={() => this.selectedSortType('Low')}>Price -- Low High</span>
                    <span className={this.state.discount} onClick={() => this.selectedSortType('Discount')}>Discount</span>
                </div>
            </div>
        )
    }

    selectedSortType = function name(sortType) {
        let state = {
            high: '',
            low: '',
            discount: ''
        };
        let list = [...this.props.productList];
        let sortedList = [];

        if (sortType === 'High') {
            state.high = 'sort-active';
            sortedList = list.sort((a, b) => {
                return (a.price.display - b.price.display);
            });
        }
        if (sortType === 'Low') {
            state.low = 'sort-active';
            sortedList = list.sort((a, b) => {
                return (b.price.display - a.price.display);
            });
        }
        if (sortType === 'Discount') {
            state.discount = 'sort-active';
            sortedList = list.sort((a, b) => {
                return (b.discount - a.discount);
            });
        }

        this.props.setSortType(sortType);
        this.props.sortInitialData(sortedList);
        this.setState(state);
    }

}

const mapStateToProps = state => {
    return {
        productList: state.productList || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sortInitialData: payload => {
            dispatch(actionFetch(payload));
        },
        setSortType: payload => {
            dispatch(actionSetSortType(payload));
        }
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};

const actionSetSortType = payload => {
    return { type: "SORTTYPE", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);