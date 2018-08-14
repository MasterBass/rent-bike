import React from 'react';
import ColorListRow from './ColorListRow';

const ColorList = ({colors, redirect, deleteColor}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Color</th>
                <th>Action</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {colors.map(color =>
                <ColorListRow key={color.id} color={color}
                              redirect={redirect} deleteColor={deleteColor} />
            )}
            </tbody>
        </table>
    );
};

export default ColorList;