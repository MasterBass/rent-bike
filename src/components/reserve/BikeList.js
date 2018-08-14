import React from 'react';
import BikeListRow from './BikeListRow';

const BikeList = ({bikes, reserveBike, onPhotoOpen}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Model</th>
                <th>Color</th>
                <th>Weight, kg</th>
                <th>Photo</th>
                <th>Location</th>
                <th>Rate</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {bikes.map(bike =>
                <BikeListRow key={bike.id} bike={bike} onPhotoOpen={onPhotoOpen}
                             reserveBike={reserveBike}/>
            )}
            </tbody>
        </table>
    );
};

export default BikeList;
