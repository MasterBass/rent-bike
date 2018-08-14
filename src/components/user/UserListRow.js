import React from 'react';
import {Link} from 'react-router-dom';

const UserListRow = ({user}) => {
    return (
        <tr>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.isActive ? 'Active' : 'Not Active'}</td>
            <td><Link to={'/user/' + user.uid}>Edit</Link></td>
        </tr>
    );
};

export default UserListRow;
