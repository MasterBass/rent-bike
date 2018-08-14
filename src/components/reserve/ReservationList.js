import React from 'react';
import ReservationListRow from './ReservationListRow';

const ReservationList = ({reserves, rates, cancelReserve, rateReserve, rateOnChange}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Model</th>
                <th>Location</th>
                <th>Start date</th>
                <th>End date</th>
                <th className="rate-header">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {reserves.map(reserve => {
                const rate = rates.find(r => r.resId === reserve.id);
                return <ReservationListRow key={reserve.id}
                                        reserve={reserve} rate={rate} rateOnChange={rateOnChange}
                                        rateReserve={rateReserve} cancelReserve={cancelReserve}/>
                }
            )}
            </tbody>
        </table>
    );
};

export default ReservationList;
