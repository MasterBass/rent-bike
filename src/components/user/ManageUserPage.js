import React from 'react';
import toastr from 'toastr';
import {push} from 'react-router-redux';
import * as authServices from '../../services/authenticationService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserForm from './UserForm';

class ManageBikePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: Object.assign({}, this.props.user),
            saving: false
        };

        this.updateUserState = this.updateUserState.bind(this);
        this.saveUser = this.saveUser.bind(this);

    }

    componentWillMount() {

        if (!this.props.users || this.props.users.length === 0) {
            this.props.services.getAllUsers()
                .catch(error => {
                    toastr.error(error);
                });
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user.uid !== nextProps.user.uid) {
            this.setState({user: Object.assign({}, nextProps.user)});
        }

    }

    updateUserState(event) {
        const field = event.target.name;
        let user = this.state.user;

        if(field === 'isActive') {
            user[field] = event.target.value === 'true'
        } else {
            user[field] = event.target.value;
        }
        return this.setState({user: user});
    }


    saveUser(event) {
        event.preventDefault();

        this.setState({saving: true});

        this.props.services.saveUser(this.state.user)
            .then(() => {
                this.setState({saving: false});
                toastr.success('User Saved');
                this.props.redirect('/manage-users');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    render() {

        const roles = [
            {id: 'user', name: 'Ordinary User'},
            {id: 'admin', name: 'Administrator'}
        ];

        const statuses = [
            {id: 'true', name: 'Is Active'},
            {id: 'false', name: 'Not Active'}
        ];

        return (
            <UserForm roles={roles}
                      statuses={statuses}
                      user={this.state.user}
                      saving={this.state.saving}
                      onSave={this.saveUser}
                      onChange={this.updateUserState}
            />
        );
    }
}

function getUserById(users, id) {
    const user = users.filter(u => u.uid === id);
    if (user) return user[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const userId = ownProps.match.params.id;
    let user = {
        email: '',
        role: 'user',
        isActive: false
    };
    if (userId && state.users.length > 0) {
        user = Object.assign({}, getUserById(state.users, userId));
    }

    return {
        user: user,
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        services: bindActionCreators(authServices, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBikePage);