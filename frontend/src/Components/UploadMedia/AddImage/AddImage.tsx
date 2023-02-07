import React from "react";
import './AddImage.css';

export const AddImage = () => {

    const openFileUpload = () => {
        const input = document.getElementById('file-input');

        if (input) {
            input.click();
        }
    };

    return (
        <div>
            <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Images</button>
            <input
                type="file" multiple
                accept="image/*,video/mp4,video/x-m4v,video/*"
                style={{ display: 'none' }}
                id="file-input"
            />
        </div>
    )
}