import React from 'react';
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {apiKey} from '../../api/database';


const MapComponent = compose(withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?
    v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,

}), withScriptjs, withGoogleMap)((props) => {
    return (
        <GoogleMap
            defaultZoom={8}
            onDragEnd={props.onMapChanged}
            onZoomChanged={props.onMapChanged}
            ref={props.onMapMounted}
            center={{lat: props.centerLocation.lat, lng: props.centerLocation.lng}}>
            {props.markers.map((marker, index) =>
                <Marker key={index}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng
                        }}/>)}
        </GoogleMap>
    );
});

export default MapComponent