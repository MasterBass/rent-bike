import React from 'react';
import moment from 'moment';

const BikeReportListRow = ({reserve}) => {
    return (
        <tr>
            <td>{reserve.model}</td>
            <td>{reserve.color}</td>
            <td>{reserve.address}</td>
            <td>{moment.unix(reserve.start).format('DD-MM-YYYY')}</td>
            <td>{moment.unix(reserve.end).format('DD-MM-YYYY')}</td>
            <td className="red">{reserve.isCancelled ? "CANCELLED" : ""}</td>
        </tr>
    );
};

export default BikeReportListRow;
