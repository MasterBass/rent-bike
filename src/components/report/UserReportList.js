import React from 'react';
import UserReportListRow from './UserReportListRow';

const UserReportList = ({data}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Email</th>
                <th>Model</th>
                <th>Address</th>
                <th>Start date</th>
                <th>End date</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, id) => {
                    return <UserReportListRow key={id} reserve={item} />
                }
            )}
            </tbody>
        </table>
    );
};

export default UserReportList;
