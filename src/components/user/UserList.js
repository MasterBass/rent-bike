import React from 'react';
import UserListRow from './UserListRow';

const UserList = ({users}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>User Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, id) => {
                    return <UserListRow key={id} user={user} />
                }
            )}
            </tbody>
        </table>
    );
};

export default UserList;