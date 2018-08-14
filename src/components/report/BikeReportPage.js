import React from 'react';
import {connect} from 'react-redux';
import * as bikeServices from '../../services/bikeService';
import BikeReportList from './BikeReportList';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';


class BikeReportPage extends React.Component {

    componentWillMount() {

        if (!this.props.bikes || this.props.bikes.length === 0) {
            this.props.services.loadBikes()
                .catch(error => {
                    toastr.error(error);
                });
        }
    }


    render() {
        return (
            <div>
                <h3>Bikes Report</h3>
                <BikeReportList bikes={this.props.bikes}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        bikes: state.bikes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        services: bindActionCreators(bikeServices, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeReportPage);