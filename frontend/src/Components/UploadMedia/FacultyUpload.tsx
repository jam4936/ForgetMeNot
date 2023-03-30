import React, {useEffect, useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import Patient from "../../Models/Patient";
import GetMedia from "../../Services/GetMedia";
import Media from "../../Models/Media";
import UploadMediaService from "../../Services/UploadMediaService";

import {Puff} from 'react-loader-spinner';
import {Dialog, IconButton, Tooltip} from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


function FacultyUpload(props: any) {
    let patient = props.patient;
    let allowInput = props.allowInput;

    const [mediaFiles, setMedia] = useState<Media[]>();
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [mediaLoading, setMediaLoading] = useState(false);

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
        setMediaLoading(true);
        await initializeMedia();
        setMediaLoading(false);
    }

    const initializeMedia = async () => {
        await GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.mediaMetadata);
    }

    const uploadMediaFile = async (file : File[]) =>{
        setMediaLoading(true);
        for(let i = 0; i < file.length; i++){
            await UploadMediaService.uploadMedia(patient.id.toString(), file[i], undefined, true);
        }
        await initializeMedia();
        setMediaLoading(false)
    }

    if(!dataLoaded){
        initializeData();
    }

    if(!dataLoaded){
        return (
            <div id="mediaUpload">
                <div>
                <Dialog disableScrollLock={true} open={!dataLoaded} id="loadingScreenDialog">
                    <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!dataLoaded} />
                </Dialog>
                </div>
            </div>
        )
    }else {
        return (
            <div>

                <Dialog open={mediaLoading} id="loadingScreenDialog">
                    <Puff height="80"
                          width="80"
                          radius={1}
                          color="#EFF1FB" visible={mediaLoading}/>
                </Dialog>
                <div id="mediaUpload" hidden={mediaLoading}>

                    <div id="sectionTitle">
                        <div>
                    <span>
                        <Tooltip title="A single video that will be displayed to your residents every morning."
                                 placement="right" enterTouchDelay={0}>
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
                            {mediaFiles?.map((element) => {
                                const re = /(?:\.([^.]+))?$/;
                                if (re.exec(element.objectKey)![1] === "mp4" && element.isOrientation) {
                                    return <Thumbnail media={element} isVideo={true}
                                                      callback={deleteCallback}></Thumbnail>
                                }
                            })}
                        </div>

                        <br/>

                        <div>
                            <button type="button" className="uploadButton" onClick={openFileUpload}>+ Add Video</button>
                            <input
                                type="file"
                                accept="video/mp4,video/x-m4v,video/*"
                                style={{display: 'none'}}
                                id="file-input"
                                onChange={async () => await onImageChange}
                            />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default FacultyUpload