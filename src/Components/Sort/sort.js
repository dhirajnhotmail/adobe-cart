import React, { Component } from 'react';
import { connect } from "react-redux";
import './sort.scss';

class Sort extends Component {

    constructor(props) {
        super();
        this.state = {
            high: '',
            low: '',
            discount: '',
            sortSelected: ''
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

                {this.props.sortFilter.showSort ?
                    <div className='mobile-sort'>
                        <div className="modal">
                            <div className="modal-content">
                                <b>Sort Options</b><br></br><br></br>
                                <input type="radio" id="High" name="gender" value="High" onChange={(event) => { this.handleOptionChange(event) }} />
                                <label htmlFor="High">Price -- Hight Low</label><br></br>
                                <input type="radio" id="Low" name="gender" value="Low" onChange={(event) => { this.handleOptionChange(event) }} />
                                <label htmlFor="Low">Price -- Low High</label><br></br>
                                <input type="radio" id="Discount" name="gender" value="Discount" onChange={(event) => { this.handleOptionChange(event) }} />
                                <label htmlFor="Discount">Discount</label>
                                <div className='modalBtn'>
                                    <div className='cancelBtn' onClick={() => { this.cancel() }}>Cancel</div>
                                    <div className='applyBtn' onClick={() => { this.apply() }}>Apply</div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
            </div >
        )
    }

    cancel = function () {
        this.props.sortFilterShow({
            showSort: false,
            showFilter: false
        });
    }

    apply = function () {
        if (this.state.sortSelected) {
            this.cancel();
            this.selectedSortType(this.state.sortSelected);
        }
    }

    handleOptionChange = function (event) {
        this.setState({ sortSelected: event.target.value });
    }

    selectedSortType = function (sortType) {
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
        setSortType: payload => {
            dispatch(actionSetSortType(payload));
        },
        sortFilterShow: payload => {
            dispatch(actionSortFilterShow(payload));
        }
    };
};

const actionFetch = payload => {
    return { type: "FETCH", payload };
};

const actionSetSortType = payload => {
    return { type: "SORTTYPE", payload };
};

const actionSortFilterShow = payload => {
    return { type: "SORTFILTERSHOW", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);