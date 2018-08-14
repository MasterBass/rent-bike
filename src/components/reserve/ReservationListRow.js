import React from 'react';
import moment from 'moment';
import Star from './Star';

const ReservationListRow = ({reserve, rate, cancelReserve, rateReserve, rateOnChange}) => {
    const startDate = moment.unix(reserve.start);
    const endDate = moment.unix(reserve.end);
    const currentTime = moment().unix();
    const isNotRated = !reserve.rate;
    const currentRate = isNotRated ? (rate ? rate.rate : 0) : reserve.rate;

    return (
        <tr>
            <td>{reserve.model}</td>
            <td>{reserve.location}</td>
            <td>{startDate.format('DD-MM-YYYY')}</td>
            <td>{endDate.format('DD-MM-YYYY')}</td>
            <td>
                {(currentTime < reserve.end) ? (

                    reserve.isCancelled ? (
                        <span className="red">CANCELLED</span>
                    ) : (
                        <a href={"#cancel"} id={reserve.id}
                           onClick={cancelReserve}>Cancel Reserv</a>
                    )

                ) : (
                    <div>
                        {[1, 2, 3, 4, 5].map((level, i) =>
                            <Star key={i} reserve={reserve} currentRate={currentRate}
                                  rateOnChange={rateOnChange} level={level}/>)}

                        <br/>
                        {isNotRated && <a href={"#rateReserve"} id={reserve.id}
                           onClick={(event) => rateReserve(reserve, currentRate, event)}>Submit Rate</a>}
                    </div>
                )}
            </td>
        </tr>
    );
};

export default ReservationListRow;
