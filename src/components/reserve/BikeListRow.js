import React from 'react';
import {round} from '../../../src/Utility';
import noImage from '../../img/no-image.png';

const BikeListRow = ({bike, reserveBike, onPhotoOpen}) => {

    return (
        <tr className={bike.className}>
            <td>{bike.model}</td>
            <td>{bike.color}</td>
            <td>{bike.weight}</td>
            <td>{bike.img === noImage ? '' :
                <a id={bike.id} href={"#openPhotoModal"} onClick={onPhotoOpen}>photo</a>}
            </td>
            <td>{bike.location.address}</td>
            <td>{bike.rate ? round(bike.rate.scores / bike.rate.votes, 2) : ''}</td>
            <td><a href={"#reserveBike"} id={bike.id} onClick={reserveBike}>Reserv</a></td>
        </tr>
    );
};

export default BikeListRow;
