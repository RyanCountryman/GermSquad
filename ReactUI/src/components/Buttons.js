// 5/14/2024
// Button component copied from:
// https://www.robinwieruch.de/react-button/

import React from 'react';

const Buttons = ({ onEditClick, onDeleteClick}) => {
    const editClick = () => {
    // implementation details
    };
    const deleteClick = () => {
        // implementation details
        onDeleteClick();
        };

    return (
        <div>
            <button type="button" onClick={onEditClick}>
                Edit
        </button>
        <button type="button" onClick={deleteClick}>
                Delete
        </button>
        </div>
    );
};

export default Buttons;