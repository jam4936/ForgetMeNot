import React, {useEffect, useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import Patient from "../../Models/Patient";
import GetMedia from "../../Services/GetMedia";
import Media from "../../Models/Media";
import UploadMediaService from "../../Services/UploadMediaService";
import spinner from "../../Assets/loadingspinner.gif";
import {IconButton, Tooltip} from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export const UploadMedia = (patient : Patient, allowInput: boolean) => {
    const [mediaFiles, setMedia] = useState<Media[]>();
    const [images, setImages] = useState([] as any);
    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const openFileUpload = () => {
        const input = document.getElementById('file-input');
        if (input) {
            input.click();
        }
    };

    const initializeData = async() => {
        //initializes the questions
        await initializeMedia();
        setDataLoaded(true);
    }

    async function onImageChange(e: any) {
       uploadMediaFile(e.target.files);
    }


    const deleteCallback = async (id: string) =>{
            await initializeMedia();
    }

    const initializeMedia = async () => {
        await GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.mediaMetadata);
    }

    const uploadMediaFile = async (file : File[]) =>{
        for(let i = 0; i < file.length; i++){
            await UploadMediaService.uploadMedia(patient.id.toString(), file[i]);
        }
        await initializeMedia();
    }

    if(!dataLoaded){
        initializeData();
    }




    if(!dataLoaded){
        return (
            <div id="mediaUpload">
                <div>
                    <img id="spinner" src={spinner} alt="loading..." />
                </div>
            </div>
        )
    }else {
        return (
            <div id="mediaUpload">
                <section className="mediaUploadSection">
                    <div id="sectionTitle">
                        <div>
                            <span>
                                <Tooltip title="A single video that will be displayed to your family member every morning. It is recommended to
                                                include information about why they are at the facility, and that they are safe. " placement="right" enterTouchDelay={0}>
                                    <IconButton size="large">
                                        <InfoRoundedIcon fontSize="inherit"></InfoRoundedIcon>
                                    </IconButton>
                                </Tooltip>
                                Greeting Video
                            </span>
                        </div>
                    </div>
                    <div className="imageGrid">

                    </div>

                    <br/>

                    <div>
                        <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Video</button>
                        <input
                            type="file" multiple
                            accept="image/*,video/mp4,video/x-m4v,video/*"
                            style={{display: 'none'}}
                            id="file-input"
                            onChange={onImageChange}
                        />
                    </div>
                </section>
                <section className="mediaUploadSection">
                    <div id="sectionTitle">
                        <div>
                            <span>
                                <Tooltip title="General images and videos that will be displayed to your family member
                                                via the memory feed." placement="right" enterTouchDelay={0}>
                                    <IconButton size="large">
                                        <InfoRoundedIcon fontSize="inherit"></InfoRoundedIcon>
                                    </IconButton>
                                </Tooltip>
                                Memory Feed Media
                            </span>
                        </div>
                    </div>
                    <div className="imageGrid">
                        {mediaFiles?.map((element) => {
                            const re = /(?:\.([^.]+))?$/;
                            if (re.exec(element.objectKey)![1] === "mp4") {
                                console.log(element.url)
                                return <Thumbnail media={element} isVideo={true} callback={deleteCallback}></Thumbnail>
                            } else {
                                return <Thumbnail media={element} isVideo={false} callback={deleteCallback}></Thumbnail>
                            }
                        })}
                    </div>

                    <br/>

                    <div>
                        <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Images</button>
                        <input
                            type="file" multiple
                            accept="image/*,video/mp4,video/x-m4v,video/*"
                            style={{display: 'none'}}
                            id="file-input"
                            onChange={async () => await onImageChange}
                        />
                    </div>
                </section>
            </div>
        )
    }
}