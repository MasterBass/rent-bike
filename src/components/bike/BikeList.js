import React from 'react';
import BikeListRow from './BikeListRow';

const BikeList = ({bikes, deleteBike}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Model</th>
                <th>Color</th>
                <th>Weight, kg</th>
                <th>Location</th>
                <th>Available</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {bikes.map(bike =>
                <BikeListRow key={bike.id} bike={bike} deleteBike={deleteBike} />
            )}
            </tbody>
        </table>
    );
};

export default BikeList;
