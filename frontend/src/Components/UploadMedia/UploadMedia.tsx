import React, {useEffect, useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import Patient from "../../Models/Patient";
import GetMedia from "../../Services/GetMedia";
import Media from "../../Models/Media";
import UploadMediaService from "../../Services/UploadMediaService";
function UploadMedia(props: any) {
    let patient = props.patient;
    let allowInput = props.allowInput;
    const [mediaFiles, setMedia] = useState<Media[]>();
    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
// export const UploadMedia = (patient : Patient, allowInput: boolean) => {
//     const [mediaFiles, setMedia] = useState<Media[]>();
    const [images, setImages] = useState([] as any);

    const openFileUpload = () => {
        const input = document.getElementById('file-input');

        if (input) {
            input.click();
        }
    };

    const initializeData = async() => {
        //initializes the questions
        await initializeMedia();
        await initializeUpload()
    }

    function onImageChange(e: any) {
        setImages([...e.target.files]);
    }


    const initializeMedia = async () => {
        await GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.mediaMetadata);
    }

    const initializeUpload = async () => {
        if (images.length < 1) return;

        for(let i = 0; i < images.length; i++){
            await UploadMediaService.uploadMedia(patient.id.toString(), images[i]);
        }
    }

    useEffect(() => {
        initializeData();
    }, [images]);

    return (
        <div id="mediaUpload">

            <section>
                <div className="imageGrid">
                    {mediaFiles?.map((element) => {
                        return <Thumbnail image={element}></Thumbnail>
                    })}
                </div>

                <br />

                <div>
                    <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Images</button>
                    <input
                        type="file" multiple
                        accept="image/*,video/mp4,video/x-m4v,video/*"
                        style={{ display: 'none' }}
                        id="file-input"
                        onChange={onImageChange}
                    />
                </div>
            </section>
        </div>
    )

}
export default UploadMedia