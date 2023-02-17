import React, {useEffect, useState} from "react";
import './AddImage.css';
import Patient from "../../../Models/Patient";
import UploadMediaService from "../../../Services/UploadMediaService";

export const AddImage = (patient : Patient, allowInput: boolean) => {
    const [images, setImages] = useState([] as any);
    const [imageURLS, setImageURLs] = useState([]);

    const openFileUpload = () => {
        const input = document.getElementById('file-input');

        if (input) {
            input.click();
        }
    };

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls: any = [];
        console.log(images)
        images.forEach((image:any) => UploadMediaService.uploadMedia(patient.id.toString(), image));
        setImageURLs(newImageUrls);
    }, [images]);

    function onImageChange(e: any) {
        setImages([...e.target.files]);
    }

    return (
        <div>
            <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Images</button>
            <input
                type="file" multiple
                accept="image/*,video/mp4,video/x-m4v,video/*"
                style={{ display: 'none' }}
                id="file-input"
                onChange={onImageChange}
            />
            {imageURLS.map((imageSrc) => (
                <img src={imageSrc} alt="not fount" width={"250px"} />
            ))}
        </div>
    )
}