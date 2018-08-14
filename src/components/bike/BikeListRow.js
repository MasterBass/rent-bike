import React from 'react';
import {Link} from 'react-router-dom';

const BikeListRow = ({bike, deleteBike}) => {
    return (
        <tr>
            <td><Link to={'/bike/' + bike.id}>{bike.model}</Link></td>
            <td>{bike.color}</td>
            <td>{bike.weight}</td>
            <td>{bike.location.address}</td>
            <td className="text-center">{bike.isAvailable ? 'Yes' : 'No'}</td>
            <td><a href={"#deleteBike"} id={bike.id} onClick={deleteBike}>Delete</a></td>
        </tr>
    );
};

export default BikeListRow;
