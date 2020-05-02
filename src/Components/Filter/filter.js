import React, { Component } from 'react';
import { connect } from "react-redux";
import './filter.scss';
import { getInitialData } from '../../Api/api';
import { initialData } from '../../Api/cartJson';

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            min: 100,
            max: 100000
        };
    }

    render() {
        return (
            <div className='filter-container'>
                <span><b>Filters</b></span>
                <div className='sliders'>
                    <div>
                        <span className='minVal'>{this.state.min} </span>
                        <span className='maxVal'>{this.state.max} </span>
                    </div>
                    <input type="range" min="100" max="100000" value={this.state.min} className="slider" onChange={(e) => { this.onChangeSliderFirst(e) }} />
                    <input type="range" min="100" max="100000" value={this.state.max} className="slider" onChange={(e) => { this.onChangeSliderSecond(e) }} />
                    <div className='price-label'>Price</div>
                </div>
                <div id='filter' onClick={() => { this.calculateRange() }}>Apply</div>
            </div>
        )
    }

    onChangeSliderFirst = function (e) {
        this.setState({ min: e.target.value });
    }

    onChangeSliderSecond = function (e) {
        this.setState({ max: e.target.value });
    }

    calculateRange = function () {
        getInitialData()
            .then(response => {
                this.setData(response.data);
            })
            .catch(error => {
                this.setData(initialData.items);
            });
    }

    setData = function (list) {
        let min = this.state.min < this.state.max ? this.state.min : this.state.max;
        let max = this.state.min > this.state.max ? this.state.min : this.state.max;

        let sortedList = list.filter((item) => {
            if (item.price.display >= min && item.price.display <= max) {
                return item;
            }
            return null;
        });
        this.props.sortInitialData(sortedList);
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
        fetchInitialData: payload => {
            dispatch(actionFetch(payload));
        }
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);