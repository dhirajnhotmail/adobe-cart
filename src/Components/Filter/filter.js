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
                <div className='desktop-sort'>
                    <span><b>Filters</b></span>
                    <div className='sliders'>
                        <div>
                            <span className='minVal'>{this.state.min} </span>
                            <span className='maxVal'>{this.state.max} </span>
                        </div>
                        <input type="range" min="100" max="100000" value={this.state.min} className="slider" onChange={(event) => { this.onChangeSliderFirst(event) }} />
                        <input type="range" min="100" max="100000" value={this.state.max} className="slider" onChange={(event) => { this.onChangeSliderSecond(event) }} />
                        <div className='price-label'>Price</div>
                    </div>
                    <div id='filter' onClick={() => { this.calculateRange() }}>Apply</div>
                </div>

                {this.props.sortFilter.showFilter ?
                    <div className='mobile-filter'>
                        <div className="modal">
                            <div className="modal-content">
                                <b>Filter Options</b><br></br><br></br>

                                <div className='sliders'>
                                    <div>
                                        <span className='minVal'>{this.state.min} </span>
                                        <span className='maxVal'>{this.state.max} </span>
                                    </div>
                                    <input type="range" min="100" max="100000" value={this.state.min} className="slider" onChange={(event) => { this.onChangeSliderFirst(event) }} />
                                    <input type="range" min="100" max="100000" value={this.state.max} className="slider" onChange={(event) => { this.onChangeSliderSecond(event) }} />
                                    <div className='price-label'>Price</div>
                                </div>

                                <div className='modalBtn'>
                                    <div className='cancelBtn' onClick={() => { this.cancel() }}>Cancel</div>
                                    <div className='applyBtn' onClick={() => { this.apply() }}>Apply</div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
            </div>
        )
    }

    cancel = function () {
        this.props.sortFilterShow({
            showSort: false,
            showFilter: false
        });
    }

    apply = function () {
        this.cancel();
        this.calculateRange();
    }

    onChangeSliderFirst = function (event) {
        this.setState({ min: event.target.value });
    }

    onChangeSliderSecond = function (event) {
        this.setState({ max: event.target.value });
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
        productList: state.productList || [],
        sortFilter: state.sortFilterShow || {
            showSort: false,
            showFilter: false
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sortInitialData: payload => {
            dispatch(actionFetch(payload));
        },
        fetchInitialData: payload => {
            dispatch(actionFetch(payload));
        },
        sortFilterShow: payload => {
            dispatch(actionSortFilterShow(payload));
        }
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};

const actionSortFilterShow = payload => {
    return { type: "SORTFILTERSHOW", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);