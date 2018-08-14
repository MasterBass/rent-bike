import React from 'react';

const ColorListRow = ({color, redirect, deleteColor}) => {
    return (
        <tr>
            <td>{color.name}</td>
            <td><a href={"#redirectToBikes"} id={color.id} onClick={redirect}>Select</a></td>
            <td><a href={"#deleteColor"} id={color.id} onClick={deleteColor}>Delete</a></td>
        </tr>
    );
};

export default ColorListRow;
