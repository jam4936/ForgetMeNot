import React, {useEffect, useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import Patient from "../../Models/Patient";
import GetMedia from "../../Services/GetMedia";
import Media from "../../Models/Media";
import UploadMediaService from "../../Services/UploadMediaService";

import spinner from "../../Assets/loadingspinner.gif";
import {Puff} from 'react-loader-spinner';
import {Dialog, IconButton, Tooltip} from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


function FacultyUpload(props: any) {
    let patient = props.patient;
    let allowInput = props.allowInput;

    const [mediaFiles, setMedia] = useState<Media[]>();
    const [images, setImages] = useState([] as any);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [mediaLoading, setMediaLoading] = useState(false);

    const openFileUpload = () => {
        const input = document.getElementById('file-input');
        if (input) {
            input.click();
        }
    };

    const initializeMedia = async () => {
        await GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.mediaMetadata);
    }

    async function onImageChange(e: any) {
        uploadMediaFile(e.target.files);
    }

    const uploadMediaFile = async (file : File[]) =>{
        setMediaLoading(true);
        for(let i = 0; i < file.length; i++){
            await UploadMediaService.uploadMedia(patient.id.toString(), file[i]);
        }
        await initializeMedia();
        setMediaLoading(false)
    }

    return (
        <div>

            <Dialog open={mediaLoading} id="loadingScreenDialog">
                <Puff   height="80"
                        width="80"
                        radius={1}
                        color="#EFF1FB" visible={mediaLoading} />
            </Dialog>
            <div id="mediaUpload" hidden={mediaLoading}>

                <div id="sectionTitle">
                    <div>
                    <span>
                        <Tooltip title="A single video that will be displayed to your residents every morning." placement="right" enterTouchDelay={0}>
                            <IconButton size="large">
                                <InfoRoundedIcon fontSize="inherit"></InfoRoundedIcon>
                            </IconButton>
                        </Tooltip>
                        Orientation Video
                    </span>
                    </div>
                </div>
                <section className="mediaUploadSection">

                    <div className="imageGrid">


                    </div>

                    <br/>

                    <div>
                        <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Video</button>
                        <input
                            type="file"
                            accept="video/mp4"
                            style={{display: 'none'}}
                            id="file-input"
                            onChange={onImageChange}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FacultyUpload