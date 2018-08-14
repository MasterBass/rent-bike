import React from 'react';
import {push} from 'react-router-redux';
import noImage from '../../img/no-image.png';
import {connect} from 'react-redux';
import toastr from 'toastr';
import BikeList from './BikeList';
import * as bikeServices from '../../services/bikeService';
import * as bikeActions from '../../actions/bikeActions';
import {bindActionCreators} from 'redux';

class BikesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddBikePage = this.redirectToAddBikePage.bind(this);
        this.deleteBike = this.deleteBike.bind(this);
    }

    componentWillMount() {
        if (this.props.bikes.length === 0) {
            this.props.bikeServices.loadBikes()
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    deleteBike(event) {
        event.preventDefault();
        const bike = getBikeById(this.props.bikes, event.target.id);
        if (window.confirm("Would you like to delete " + bike.model + "?")) {
            this.props.bikeServices.deleteBike(getBikeById(this.props.bikes, event.target.id))
                .then(() => {
                    toastr.success(bike.model + " deleted!");
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    redirectToAddBikePage() {
        let bike = {
            id: '',
            model: '',
            color: '',
            colorId: '',
            weight: '',
            location: {lat: 48.6208, lng: 22.287883, address: ''},
            isAvailable: false,
            img: noImage
        };
        this.props.bikeActions.currentBikeSave(bike);
        this.props.redirect('/bike');
    }

    render() {
        const {bikes} = this.props;
        return (
            <div>
                <input type="submit"
                       value="Add bike"
                       className="btn btn-primary"
                       onClick={this.redirectToAddBikePage}/>
                <BikeList bikes={bikes} deleteBike={this.deleteBike}/>
            </div>
        )
    }
}

function getBikeById(bikes, id) {
    const bike = bikes.filter(bike => bike.id === id);
    if (bike) return bike[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    return {
        bikes: state.bikes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        bikeServices: bindActionCreators(bikeServices, dispatch),
        bikeActions: bindActionCreators(bikeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BikesPage);