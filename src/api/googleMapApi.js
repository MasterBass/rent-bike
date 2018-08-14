import axios from 'axios';
import {apiKey} from './database';

class GoogleMapApi {

    static getLocation(address) {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
    }
}

export default GoogleMapApi;