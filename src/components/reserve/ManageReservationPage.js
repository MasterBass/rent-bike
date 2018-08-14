/*global google*/
import React from 'react';
import toastr from 'toastr';
import moment from 'moment';
import FiltersForm from "./FiltersForm";
import MapComponent from '../../components/common/MapComponent';
import * as colorServices from '../../services/colorService';
import * as bikeServices from '../../services/bikeService';
import * as reservationService from '../../services/reservationService';
import * as bikeActions from '../../actions/bikeActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BikeList from './BikeList';
import {round} from '../../../src/Utility';
import noImage from '../../img/no-image.png';
import Modal from 'react-modal';

class ManageReservationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: Object.assign({}, this.props.filter),
            errors: {},
            rates: [
                {id: 10, name: '1'},
                {id: 15, name: '1.5'},
                {id: 20, name: '2'},
                {id: 25, name: '2.5'},
                {id: 30, name: '3'},
                {id: 35, name: '3.5'},
                {id: 40, name: '4'},
                {id: 45, name: '4.5'},
                {id: 50, name: '5'}
            ],
            bikes: [],
            modalIsOpen: false,
            modalImageUrl: noImage
        };

        Modal.setAppElement('#root');

        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.updateFilterState = this.updateFilterState.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.reserveBike = this.reserveBike.bind(this);
        this.onMapMounted = this.onMapMounted.bind(this);
        this.onMapChanged = this.onMapChanged.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentWillMount() {

        if (this.props.colors.length === 0) {
            this.props.colorServices.loadColors()
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

    componentDidMount() {
        if (this.props.bikes.length > 0) {
            this.setFilter(this.props.bikes);
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.bikes !== nextProps.bikes) {

            this.setFilter(nextProps.bikes);
        }
    }

    openModal(event) {
        event.preventDefault();
        const bike = this.props.bikes.find(bike => bike.id === event.target.id);
        this.setState({modalIsOpen: true, modalImageUrl: bike.img});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    filterFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (isNaN(this.state.filter.weight)) {
            errors.weight = 'Weight must to be a number';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    reserveBike(event) {
        event.preventDefault();
        if (window.confirm("Would you like to reserve the bike?")) {
            const bike = this.props.bikes.filter(bk => bk.id === event.target.id)[0];
            this.props.bikeServices.getNewKey().then((id) => {

                this.props.reservationServices.reserveBike({
                    model: bike.model,
                    location: bike.location.address,
                    bikeId: bike.id,
                    id: id,
                    start: (this.state.filter.startDate.startOf('day').add(14, 'hour')).unix(),
                    end: (this.state.filter.endDate.startOf('day').add(10, 'hour')).unix()
                }, this.props.auth.uid, () => {
                    toastr.success('bike reserved');
                }, (error) => {
                    if (error.message === "Bike already booked for these dates!") {
                        this.props.bikeServices.loadBikes()
                            .catch(error => {
                                toastr.error(error);
                            });
                    }
                    toastr.error(error)
                })

            })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }


    updateFilterState(event) {
        const field = event.target.name;
        let filter = this.state.filter;
        filter[field] = event.target.value;
        return this.setState({filter: filter});
    }

    startDateChange(date) {
        if (this.state.filter.endDate.diff(date, 'days') < 1) {
            this.setState({
                filter: {
                    ...this.state.filter,
                    startDate: moment(date),
                    endDate: moment(date).add(1, "days")
                }
            });
            this.setFilter(this.props.bikes, date, moment(date).add(1, 'days'));
        } else {
            this.setState({
                filter: {
                    ...this.state.filter,
                    startDate: date
                }
            });
            this.setFilter(this.props.bikes, date);
        }
    }

    endDateChange(date) {
        if (this.state.filter.startDate.diff(date, 'days') > -1) {
            this.setState({
                filter: {
                    ...this.state.filter,
                    startDate: moment(date).add(-1, "days"),
                    endDate: date
                }
            });
            this.setFilter(this.props.bikes, moment(date).add(-1, "days"), date);
        } else {
            this.setState({
                filter: {
                    ...this.state.filter,
                    endDate: date
                }
            });
            this.setFilter(this.props.bikes, null, date);
        }
    }

    applyFilters(event) {
        event.preventDefault();

        if (!this.filterFormIsValid()) {
            return;
        }

        let bikes = this.props.bikes;
        this.setFilter(bikes);

    }

    clearFilter(event) {
        event.preventDefault();

        let filter = {
            startDate: moment(),
            endDate: moment().add(1, 'days'),
            minStartDate: moment(),
            minEndDate: moment().add(1, 'days'),
            color: '',
            model: '',
            weight: '',
            location: '',
            rate: '',
            map: undefined
        };

        let bikes = this.props.bikes;

        this.setState({...this.state, filter: filter, mapChanged: false }, ()=> {

            this.setFilter(bikes, filter.startDate, filter.endDate);
        });
    }

    setFilter(bikes, start, end) {
        const startDate = start ?
            start.startOf('day').add(14, 'hour').unix() :
            this.state.filter.startDate.startOf('day').add(14, 'hour').unix();
        const endDate = end ?
            end.startOf('day').add(10, 'hour').unix() :
            this.state.filter.endDate.startOf('day').add(10, 'hour').unix();



        bikes = bikes.filter(bk => {
            if(bk.reservations) {
                for (let j = 0; j < bk.reservations.length; j++) {
                    if (!bk.reservations[j].isCancelled) {
                        if (bk.reservations[j].start >= startDate &&
                            bk.reservations[j].start <= endDate) {
                            return false;
                        }
                        if (bk.reservations[j].end >= startDate &&
                            bk.reservations[j].end <= endDate) {
                            return false;
                        }

                        if (bk.reservations[j].start <= startDate &&
                            bk.reservations[j].end >= endDate) {
                            return false;
                        }
                    }
                }
            }
            return true;

        });


        if (this.state.filter.weight) {
            bikes = bikes.filter(bk => Number(bk.weight) <= Number(this.state.filter.weight));
        }

        if (this.state.filter.location) {

            let words = this.state.filter.location.split(' ');
            bikes = bikes.filter(bk => {
                for (let i = 0; i < words.length; i++) {
                    if (bk.location.address.toString().toLowerCase().indexOf(
                            words[i].toLowerCase()) === -1) {
                        return false;
                    }
                }
                return true;
            });
        }

        if (this.state.filter.model) {
            let words = this.state.filter.model.split(' ');
            bikes = bikes.filter(bk => {
                for (let i = 0; i < words.length; i++) {
                    if (bk.model.toString().toLowerCase().indexOf(
                            words[i].toLowerCase()) === -1) {
                        return false;
                    }
                }
                return true;
            });
        }

        if (this.state.filter.color) {
            bikes = bikes.filter(bk =>
                bk.colorId === this.state.filter.color);
        }


        if (this.state.filter.rate) {
            bikes = bikes.filter(bk => {
                if (bk.rate) {
                    return this.state.filter.rate <= round(bk.rate.scores / bk.rate.votes, 2) * 10;
                } else {
                    return false;
                }
            });
        }

        this.props.bikeActions.currentBikeFilterSave(
            {
                ...this.state.filter,
                startDate: start ? start : this.state.filter.startDate,
                endDate: end ? end : this.state.filter.endDate,
            });

        //paint all rows

        bikes = bikes.map((bk) => {
            return {...bk, className: "selected-row"}
        });


        this.setState({ bikes: bikes, mapChanged: false });

    }

    onMapMounted(map) {
        this.setState({...this.state, map: map});
    }

    onMapChanged() {

        if (this.state.map) {
            const bound = this.state.map.getBounds();
            if (bound) {
                const isAllBikesAlreadyMarked =
                    this.state.bikes.filter(bk => bk.className !== 'selected-row').length === 0;
                const bikes = this.state.bikes.map((bk) => {
                    if (bound.contains(
                            {
                                lng: bk.location.lng,
                                lat: bk.location.lat
                            }) === true) {
                        return {...bk, className: "selected-row"}
                    } else {
                        return {...bk, className: ""}
                    }
                });

                if(bikes.filter(bk => bk.className !== 'selected-row').length === 0 && isAllBikesAlreadyMarked) {
                    return;
                }

                this.setState({
                    ...this.state, bikes: bikes, mapChanged: true, center:
                        {lat: bound.getCenter().lat(), lng: bound.getCenter().lng()}
                });

            }
        }
    }


    render() {


        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        let center = {lat: 48.6208, lng: 22.287883};
        const markers = this.state.bikes.map((bk) => {
            return {lat: bk.location.lat, lng: bk.location.lng}
        });

        if (!this.state.mapChanged) {


            if (markers && markers.length > 0 && this.state.map) {

                let bounds = new google.maps.LatLngBounds();
                for (let i = 0; i < markers.length; i++) {
                    bounds.extend({lat: markers[i].lat, lng: markers[i].lng});
                }

                center.lat = bounds.getCenter().lat();
                center.lng = bounds.getCenter().lng();

                this.state.map.fitBounds(bounds);
            }
        } else {
            center = this.state.center;
        }


        return (
            <div>
                <FiltersForm
                    filter={this.state.filter}
                    errors={this.state.errors}
                    colors={this.props.colors}
                    rates={this.state.rates}
                    onChange={this.updateFilterState}
                    onApply={this.applyFilters}
                    startDateChange={this.startDateChange}
                    endDateChange={this.endDateChange}
                    clearFilter={this.clearFilter}
                />
                <BikeList bikes={this.state.bikes}
                          reserveBike={this.reserveBike} onPhotoOpen={this.openModal}/>
                <MapComponent
                    centerLocation={center}
                    markers={markers} onMapMounted={this.onMapMounted}
                    onMapChanged={this.onMapChanged}
                />

                <Modal isOpen={this.state.modalIsOpen} style={customStyles}
                    onRequestClose={this.closeModal} >
                    <div onClick={this.closeModal}>
                        <img src={this.state.modalImageUrl} alt="bike"/>
                    </div>
                </Modal>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let filter = {
        startDate: moment(),
        endDate: moment().add(1, 'days'),
        minStartDate: moment(),
        minEndDate: moment().add(1, 'days'),
        color: '',
        model: '',
        weight: '',
        location: '',
        rate: ''
    };
    if (state.currentBikeFilter) {
        filter = state.currentBikeFilter;
    }

    return {
        auth: state.authentication,
        colors: state.colors,
        bikes: state.bikes,
        filter: filter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        colorServices: bindActionCreators(colorServices, dispatch),
        bikeServices: bindActionCreators(bikeServices, dispatch),
        bikeActions: bindActionCreators(bikeActions, dispatch),
        reservationServices: bindActionCreators(reservationService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageReservationPage);