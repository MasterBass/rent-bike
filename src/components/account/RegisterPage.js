import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authenticationService from '../../services/authenticationService';
import RegisterForm from "./RegisterForm";
import {push} from 'react-router-redux';
import toastr from 'toastr';

class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            registering: false,
            user: Object.assign({}, this.props.user)
        };
        this.register = this.register.bind(this);
        this.updateAccountState = this.updateAccountState.bind(this);
    }

    updateAccountState(event) {
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        return this.setState({user: user});
    }

    registerFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.user.displayName.length < 1) {
            errors.displayName = 'User name is obligatory';
            formIsValid = false;
        }
        if (this.state.user.email.length < 1) {
            errors.email = 'Email is obligatory';
            formIsValid = false;
        }
        let user = this.state.user;
        if (this.state.user.password.length < 6) {
            errors.password = 'Password must contain at least 6 characters';
            formIsValid = false;
        } else if (this.state.user.repeatPassword !== this.state.user.password) {
            errors.repeatPassword = 'Passwords are not equal';
            user.password = '';
            user.repeatPassword = '';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    register(event) {
        event.preventDefault();
        if (!this.registerFormIsValid()) {
            return;
        }

        this.setState({registering: true});
        let user = this.state.user;
        this.props.service.register(this.state.user)
            .then(() => {
                toastr.success('User registered');
                this.setState({registering: false, user: user});
                this.props.redirect('/login');
            })
            .catch(error => {
                if(error) {
                    toastr.error(error);
                } else {
                    toastr.error(error);
                }
                this.setState({registering: false});
            });
    }

    render() {
        return (
            <RegisterForm
                user={this.state.user}
                onRegister={this.register}
                registering={this.state.registering}
                errors={this.state.errors}
                onChange={this.updateAccountState}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    let user = {displayName: '', email: '', password: '', repeatPassword: ''};
    return {
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        service: bindActionCreators(authenticationService, dispatch),
        redirect: (path) => dispatch(push(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
