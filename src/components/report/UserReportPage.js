import React from 'react';
import {connect} from 'react-redux';
import * as authServices from '../../services/authenticationService';
import UserReportList from './UserReportList';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';


class UserReportPage extends React.Component {

    componentWillMount() {

        if (!this.props.data || this.props.data.length === 0) {
            this.props.services.getAllUsersData()
                .catch(error => {
                    toastr.error(error);
                });
        }
    }


    render() {
        return (
            <div>
                <h3>Users Report</h3>
                <UserReportList data={this.props.data}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        data: state.usersData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        services: bindActionCreators(authServices, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReportPage);