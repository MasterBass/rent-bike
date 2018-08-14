import React from 'react';
import {connect} from 'react-redux';
import Bikes from '../../components/bike/BikesPage';
import ManageReservation from '../../components/reserve/ManageReservationPage';

class HomePage extends React.Component {
    render() {
        if (this.props.role === 'admin') {
            return (<Bikes/>);
        } else {
            return (<ManageReservation/>);
        }

    }
}

function mapStateToProps(state, ownProps) {
    return {
        role: state.authentication.role
    };
}

export default connect(mapStateToProps)(HomePage);

