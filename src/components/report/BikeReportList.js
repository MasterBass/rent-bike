import React from 'react';
import BikeReportListRow from './BikeReportListRow';

const BikeReportList = ({bikes}) => {
    let data = [];

    bikes.map((bike) => {
       if(bike.reservations) {
           const bikeData = bike.reservations.map((reserve) => {
               return {
                   model: bike.model,
                   color: bike.color,
                   address: bike.location.address,
                   start: reserve.start,
                   end: reserve.end,
                   isCancelled: reserve.isCancelled
               }

           });
           data = [...data, ...bikeData]
       }
       return null;
    });




    return (
        <table className="table">
            <thead>
            <tr>
                <th>Model</th>
                <th>Color</th>
                <th>Address</th>
                <th>Start date</th>
                <th>End date</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, id) => {
                    return <BikeReportListRow key={id} reserve={item} />
                }
            )}
            </tbody>
        </table>
    );
};

export default BikeReportList;