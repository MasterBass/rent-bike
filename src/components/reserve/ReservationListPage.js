import React from 'react';
import {connect} from 'react-redux';
import * as authServices from '../../services/authenticationService';
import * as reservationServices from '../../services/reservationService';
import * as bikeServices from '../../services/bikeService';
import ReservationList from './ReservationList';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

class ReservationListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rates: []
        };

        this.cancelReserve = this.cancelReserve.bind(this);
        this.rateReserve = this.rateReserve.bind(this);
        this.rateOnChange = this.rateOnChange.bind(this);
    }


    componentWillMount() {

        if (!this.props.auth.reserves || this.props.auth.reserves.length === 0) {
            this.props.services.getUserData(this.props.auth.uid)
                .catch(error => {
                    toastr.error(error);
                });
        }
        if (this.props.bikes.length === 0) {
            this.props.bikeServices.loadBikes()
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    cancelReserve(event) {
        event.preventDefault();
        if (window.confirm("Would you like to cancel reserve?")) {
            const reserve = this.props.auth.reserves.filter(x => x.id === event.target.id)[0];
            this.props.reservationServices.cancelReservation(this.props.auth.uid, reserve)
                .then(() => {
                    toastr.success("Reserv canceled");
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    rateOnChange(resId, rate) {
        const resIndex = this.state.rates.findIndex(r => r.resId === resId);
        if (resIndex > -1) {
            this.setState({
                ...this.state, rates: [
                    ...this.state.rates.slice(0, resIndex),
                    {...this.state.rates[resIndex], resId: resId, rate: rate},
                    ...this.state.rates.slice(resIndex + 1)
                ]
            });
        } else {
            this.setState({
                ...this.state, rates: [
                    ...this.state.rates, {resId: resId, rate: rate}
                ]
            });
        }
    }

    rateReserve(reserve, rate, event) {
        event.preventDefault();

        if (rate === 0) {
            toastr.error("You should set rate first");
            return;
        }
        const bike = this.props.bikes.find(bk => bk.id === reserve.bikeId);

        if (window.confirm("Would you like to submit the rate?")) {
            this.props.reservationServices.rateReservation(this.props.auth.uid,
                reserve, rate, bike,
                () => {
                    toastr.success("Thank You")
                },
                (error) => {
                    if (error.message === "Reserve already rated!") {
                        this.props.services.getUserData(this.props.auth.uid)
                            .catch(error => {
                                toastr.error(error);
                            });
                    }
                    toastr.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                <h3>Reservation List</h3>
                <ReservationList
                    reserves={this.props.auth.reserves}
                    cancelReserve={this.cancelReserve}
                    rateReserve={this.rateReserve}
                    rateOnChange={this.rateOnChange}
                    rates={this.state.rates}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        auth: state.authentication,
        bikes: state.bikes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        services: bindActionCreators(authServices, dispatch),
        bikeServices: bindActionCreators(bikeServices, dispatch),
        reservationServices: bindActionCreators(reservationServices, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationListPage);