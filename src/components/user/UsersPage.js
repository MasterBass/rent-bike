import React from 'react';
import {connect} from 'react-redux';
import * as authServices from '../../services/authenticationService';
import UserList from './UserList';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';



class UsersPage extends React.Component {

    componentWillMount() {

        if (!this.props.users || this.props.users.length === 0) {
            this.props.services.getAllUsers()
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                <h3>Manage Users Page</h3>
                <UserList users={this.props.users}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        services: bindActionCreators(authServices, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
