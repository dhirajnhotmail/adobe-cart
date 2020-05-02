import React, { Component } from 'react';
import { connect } from "react-redux";
import SortIcon from '../../Assets/Image/sort.png';
import FilterIcon from '../../Assets/Image/filter.png';
import './sortFilter.scss';
import Sort from '../../Components/Sort/sort';
import Filter from '../../Components/Filter/filter';

class SortFilter extends Component {
    componentDidMount() {
        this.props.sortFilterShow({
            showSort: false,
            showFilter: false
        });
    }

    render() {
        return (
            <div className='sort-filter'>
                <div onClick={() => { this.sort() }}><img src={SortIcon} alt='' ></img> Sort</div>
                <div onClick={() => { this.filter() }}><img src={FilterIcon} alt='' ></img> Filter</div>
                {this.props.sortFilter.showSort ? <Sort></Sort> : null}
                {this.props.sortFilter.showFilter ? <Filter></Filter> : null}
            </div>
        )
    }

    sort = function () {
        this.props.sortFilterShow({
            showSort: true,
            showFilter: false
        });
    }

    filter = function () {
        this.props.sortFilterShow({
            showSort: false,
            showFilter: true
        });
    }
}


const mapStateToProps = state => {
    console.log(state.sortFilterShow);
    return {
        sortFilter: state.sortFilterShow || {
            showSort: false,
            showFilter: false
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sortFilterShow: payload => {
            dispatch(actionSortFilterShow(payload));
        }
    };
};

const actionSortFilterShow = payload => {
    return { type: "SORTFILTERSHOW", payload };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);