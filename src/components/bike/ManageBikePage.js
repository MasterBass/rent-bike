import React from 'react';
import toastr from 'toastr';
import noImage from '../../img/no-image.png';
import BikeForm from './BikeForm';
import {push} from 'react-router-redux';
import * as bikeServices from '../../services/bikeService';
import * as colorServices from '../../services/colorService';
import * as bikeActions from '../../actions/bikeActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ManageBikePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            bike: Object.assign({}, this.props.bike),
            percentage: 0,
            uploading: false,
            errors: {},
            saving: false,
            img: null
        };
        this.updateBikeState = this.updateBikeState.bind(this);
        this.redirectToAddColorPage = this.redirectToAddColorPage.bind(this);
        this.saveBike = this.saveBike.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.saveImageToStorage = this.saveImageToStorage.bind(this);
        this.searchLocation = this.searchLocation.bind(this);

    }

    componentWillMount() {
        if (this.props.colors.length === 0) {
            this.props.colorServices.loadColors()
                .catch(error => {
                    toastr.error(error);
                });
            this.props.bikeServices.loadBikes()
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.bike.id !== nextProps.bike.id) {
            this.setState({bike: Object.assign({}, nextProps.bike)});
        }

    }

    redirectToAddColorPage() {
        this.props.bikeActions.currentBikeSave({...this.state.bike, image: null});
        this.props.redirect('/colors');
    }

    bikeFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.bike.model.length < 5) {
            errors.model = 'Model must be at least 5 characters.';
            formIsValid = false;
        }

        if (this.state.bike.color.length < 3) {
            errors.colorId = 'Please select color';
            formIsValid = false;
        }

        if (this.state.bike.weight.length === 0) {
            errors.weight = 'Weight is obligatory field. Please fill the value';
            formIsValid = false;
        }

        if (isNaN(this.state.bike.weight)) {
            errors.weight = 'Weight must to be a number';
            formIsValid = false;
        }

        if (this.state.bike.location.address.length < 10) {
            errors.location = 'Address is obligatory field. Must be at least 10 characters';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    searchLocation(event) {
        event.preventDefault();
        this.props.bikeServices.getLocation(this.state.bike.location.address)
            .then((location) => {
                if (location.data.status === 'OK') {
                    if (location.data.results.length > 0) {
                        const loc = location.data.results[0];
                        if (window.confirm('You are searching for ' +
                                loc.formatted_address)) {
                            this.setState({
                                bike: Object.assign(this.state.bike,
                                    {
                                        location: {
                                            lng: loc.geometry.location.lng,
                                            lat: loc.geometry.location.lat,
                                            address: loc.formatted_address
                                        }
                                    })
                            });

                        }
                    }
                }
            })
            .catch(error => {
                toastr.error(error.message);
            });

    }

    updateBikeState(event) {
        const field = event.target.name;
        let bike = this.state.bike;
        if (field === 'color') {
            bike.colorId = event.target.value;
            if (event.target.value === '') {
                bike.color = '';
            } else {
                bike.color = this.props.colors.filter(color =>
                    color.id === event.target.value)[0].name;
            }
        } else if (field === 'isAvailable') {
            bike.isAvailable = !bike.isAvailable;
        } else if (field === 'image') {
            bike.image = event.target.files[0];
        } else if (field === 'location') {
            bike.location = {
                lng: this.state.bike.location.lng,
                lat: this.state.bike.location.lat,
                address: event.target.value
            }

        } else {
            bike[field] = event.target.value;
        }
        return this.setState({bike: bike});
    }

    uploadImage(event) {
        event.preventDefault();
        let errors = {};
        if (!this.state.bike.image) {
            errors.image = 'Image should be selected prior to upload';
            this.setState({errors: errors});
            return;
        } else {
            this.setState({errors: errors});
        }

        if (this.state.bike.id) {
            this.saveImageToStorage();
        } else {
            this.props.bikeServices.getNewKey()
                .then((id) => {
                    this.setState({
                        bike: Object.assign({}, this.state.bike, {id: id})
                    });
                    this.saveImageToStorage();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }

    }

    saveImageToStorage() {
        this.setState({uploading: true});
        this.props.bikeServices.uploadImage(this.state.bike.image,
            this.state.bike.id + '.jpg', (snapshot) => {
                let percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({percentage: percentage});
            }, (error) => {
                this.setState({uploading: false});
                toastr.error(error.message);

            }, () => {
                //load Image
                this.props.bikeServices.getImageUrl(
                    this.state.bike.id + '.jpg')
                    .then((url) => {

                        this.setState({
                            uploading: false,
                            percentage: 0,
                            saving: true,
                            bike: Object.assign({}, this.state.bike, {img: url, image: null})
                        });

                        if (this.props.bike.id !== '') {

                            this.props.bikeServices.saveBike(this.state.bike)
                                .then(() => {
                                    this.setState({saving: false});
                                    this.props.bikeActions.currentBikeSave({...this.state.bike, image: null});
                                })
                                .catch(error => {
                                    toastr.error(error);
                                    this.setState({saving: false});
                                });
                        } else {
                            this.setState({
                                saving: false
                            });
                        }

                        toastr.success('upload success');
                        document.getElementById("bike-image-upload").value = "";

                    })
                    .catch(error => {
                        toastr.error(error.message);
                        this.setState({img: noImage});
                    });

            });
    }

    saveBike(event) {
        event.preventDefault();

        if (!this.bikeFormIsValid()) {
            return;
        }

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
        this.setState({saving: true});

        this.props.bikeServices.saveBike(this.state.bike)
            .then(() => {
                this.setState({saving: false});
                this.props.bikeActions.currentBikeSave(bike);
                toastr.success('Bike Saved');
                this.props.redirect('/bikes');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    render() {
        return (
            <BikeForm
                imageUploadId="bike-image-upload"
                onChange={this.updateBikeState}
                onSave={this.saveBike}
                onSearch={this.searchLocation}
                bike={this.state.bike}
                errors={this.state.errors}
                saving={this.state.saving}
                upload={this.uploadImage}
                uploading={this.state.uploading}
                percentage={this.state.percentage}
                colors={this.props.colors}
                btnOnClick={this.redirectToAddColorPage}
                location={this.state.bike.location}
            />
        );
    }
}

function getBikeById(bikes, id) {
    const bike = bikes.filter(bike => bike.id === id);
    if (bike) return bike[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const bikeId = ownProps.match.params.id;

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

    if ((ownProps.match.path === '/bike' && !bikeId && state.currentBike) ||
        (bikeId && state.currentBike && bikeId === state.currentBike.id)) {
        bike.id = state.currentBike.id;
        bike.model = state.currentBike.model;
        bike.color = state.currentBike.color;
        bike.colorId = state.currentBike.colorId;
        bike.weight = state.currentBike.weight;
        bike.location = state.currentBike.location;
        bike.isAvailable = state.currentBike.isAvailable;
        bike.img = state.currentBike.img ? state.currentBike.img : noImage;
    } else {

        if (bikeId && state.bikes.length > 0) {
            bike = Object.assign({}, getBikeById(state.bikes, bikeId));
        }
    }

    return {
        bike: bike,
        colors: state.colors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        bikeServices: bindActionCreators(bikeServices, dispatch),
        colorServices: bindActionCreators(colorServices, dispatch),
        bikeActions: bindActionCreators(bikeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBikePage);