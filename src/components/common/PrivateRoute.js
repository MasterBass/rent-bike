import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router'
import {Redirect} from 'react-router-dom'


class PrivateRoute extends React.Component {
    render() {
        const {
            isAuthenticated,
            role,
            component: Component,
            ...props
        } = this.props;

        let isRoleAllowed = true;
        if (this.props.roleName && !this.props.roleName.includes(role)) {
            isRoleAllowed = false;
        }

        return (
            <Route
                {...props}
                render={props =>
                    isAuthenticated && isRoleAllowed
                        ?
                        <Component {...props} />
                        :
                        (
                            <Redirect to={{
                                pathname: '/login',
                                state: {from: props.location}
                            }}/>
                        )
                }
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.authentication.loggedIn,
        role: state.authentication.role,
        roleName: ownProps.roleName

    };
}

export default connect(mapStateToProps)(PrivateRoute);