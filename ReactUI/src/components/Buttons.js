// 5/14/2024
// Button component adapted from:
// https://www.robinwieruch.de/react-button/

//Button component creates two buttons that take in parent functions from source page to apply edits and deletions on entry id  
import React from 'react';

const Buttons = ({ onEditClick, onDeleteClick}) => {
    const editClick = () => {
        onEditClick();
    };
    const deleteClick = () => {
        onDeleteClick();
        };

    return (
        <div>
            <button type="button" onClick={editClick}>
                Edit
        </button>
        <button type="button" onClick={deleteClick}>
                Delete
        </button>
        </div>
    );
};

export default Buttons;