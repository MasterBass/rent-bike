import React from 'react';
import {connect} from 'react-redux';
import LoadingDots from './LoadingDots';
import * as authServices from '../../services/authenticationService';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.logOut = this.logOut.bind(this);
    }


    componentWillMount() {
        if (!this.props.isLoggedIn) {
            const user = JSON.parse(localStorage.getItem('USER'));
            if (user) {
                this.props.services.login(user);
            }
        }
    }

    logOut(event) {
        event.preventDefault();
        this.props.services.signOut();
        this.props.redirect('/');
    }

    render() {
        const role = this.props.role;
        const loading = this.props.loading;
        const isLoggedIn = this.props.isLoggedIn;
        const name = this.props.name;
        return (
            <div>
                <nav>
                    <NavLink exact to="/" activeClassName='selected'>Home</NavLink>
                    {" | "}
                    {role === "admin" &&
                    <NavLink to="/manage-users" activeClassName='selected'>Mange Users</NavLink>}
                    {role === "admin" && " | "}
                    {role === "user" &&
                    <NavLink to="/reservation-list" activeClassName='selected'>Reservaton List</NavLink>}
                    {role === "user" && " | "}
                    {role === "admin" &&
                    <NavLink to="/report-users" activeClassName='selected'>Users Report</NavLink>}
                    {role === "admin" && " | "}
                    {role === "admin" &&
                    <NavLink to="/report-bikes" activeClassName='selected'>Bikes Report</NavLink>}
                    {role === "admin" && " | "}
                    <NavLink to="/about" activeClassName='selected'>About</NavLink>
                    {loading && <LoadingDots interval={100} dots={20}/>}
                </nav>
                <div className="log-in-out">
                    {isLoggedIn && <span>Welcome,&nbsp;{name}</span>}
                    {isLoggedIn && <br/>}
                    {!isLoggedIn && <NavLink activeClassName='hidden' to="/login">LogIn</NavLink>}
                    {isLoggedIn && <a href={"#logOut"} onClick={this.logOut}>Log out</a>}
                </div>
                <div className="clear"/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        name: state.authentication.name,
        role: state.authentication.role,
        isLoggedIn: state.authentication.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        services: bindActionCreators(authServices, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));