import React, {ChangeEvent, useState} from "react";
import './AddImage.css';

export const AddImage = () => {
    const [fileList, setFileList] = useState<FileList | null>(null);
    const objectKeys: File[] = []

    const openFileUpload = () => {
        const input = document.getElementById('file-input');

        if (input) {
            input.click();
        }
    };

    const saveMedia = (e: ChangeEvent<HTMLInputElement>) =>{
        setFileList(e.target.files);
        if (!fileList) {
            return;
        }
        Array.from(fileList).forEach( file => {
            objectKeys.push(file)
            }
        )
    }

    return (
        <div>
            <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Images</button>
            <input
                type="file" multiple
                accept="image/*,video/mp4,video/x-m4v,video/*"
                style={{ display: 'none' }}
                id="file-input"
                onChange={saveMedia}
            />
        </div>
    )
}