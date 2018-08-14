import React from 'react';
import toastr from 'toastr';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import ColorList from './ColorList';
import * as colorServices from '../../../services/colorService';
import * as bikeActions from '../../../actions/bikeActions';
import {bindActionCreators} from 'redux';
import GroupTextInput from '../../common/TextInputAndButton';

class ColorsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            color: '',
            error: '',
            saving: false
        };
        this.saveColor = this.saveColor.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.redirectToBikePage = this.redirectToBikePage.bind(this);
    }

    componentWillMount() {
        if (this.props.colors.length === 0) {
            this.props.colorServices.loadColors();
        }
    }

    updateColor(event) {
        return this.setState({color: event.target.value});
    }

    colorIsValid() {
        let formIsValid = true;
        let error = '';

        if (this.state.color.length < 3) {
            error = 'Color must be at least 3 characters.';
            formIsValid = false;
        }
        this.setState({error: error});
        return formIsValid;
    }

    deleteColor(event) {
        event.preventDefault();
        if (window.confirm("Would you like to delete color?")) {
            this.props.colorServices.deleteColor(event.target.id)
                .then(() => {
                    toastr.success("Item deleted!");
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    redirectToBikePage(event) {
        event.preventDefault();

        const color = getColorById(this.props.colors, event.target.id);

        this.props.bikeActions.currentBikeSave(
            Object.assign({}, this.props.currentBike,
                { colorId: event.target.id, color: color.name })
        );

        if(this.props.currentBike.id) {
            this.props.redirect('/bike/' + this.props.currentBike.id);
        } else {
            this.props.redirect('/bike/');
        }
    }

    saveColor() {

        if (!this.colorIsValid()) {
            return;
        }
        this.setState({saving: true});
        const color = this.state.color;
        this.props.colorServices.saveColor(color).then((col) => {
            this.setState({saving: false, color: ''});
            this.props.bikeActions.currentBikeSave(
                Object.assign({}, this.props.currentBike,
                    {colorId: col.id, color: color})
            );
            if(this.props.currentBike.id) {
                this.props.redirect('/bike/' + this.props.currentBike.id);
            } else {
                this.props.redirect('/bike/');
            }
        })
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });

    }

    render() {
        const {colors} = this.props;
        return (
            <div>
                <h1>Colors Page</h1>
                <GroupTextInput
                    btnText={<span className="glyphicon glyphicon-floppy-save"/>}
                    value={this.state.color}
                    error={this.state.error}
                    saving={this.state.saving}
                    placeholder="new color"
                    btnOnClick={this.saveColor}
                    onChange={this.updateColor}
                />
                <ColorList colors={colors} redirect={this.redirectToBikePage}
                           deleteColor={this.deleteColor}/>
            </div>
        )
    }
}

function getColorById(colors, id) {
    const color = colors.filter(color => color.id === id);
    if (color) return color[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    return {
        colors: state.colors,
        currentBike: state.currentBike
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        colorServices: bindActionCreators(colorServices, dispatch),
        bikeActions: bindActionCreators(bikeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorsPage);