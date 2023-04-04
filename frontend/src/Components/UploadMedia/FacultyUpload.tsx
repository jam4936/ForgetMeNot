import React, {useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import GetMedia from "../../Services/GetMedia";
import Media from "../../Models/Media";
import UploadMediaService from "../../Services/UploadMediaService";
import {Puff} from 'react-loader-spinner';
import {Dialog, IconButton, Tooltip} from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


function FacultyUpload() {
    const [mediaFiles, setMedia] = useState<Media[]>();
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [isOrientationUploaded, setIsOrientationUploaded] = useState(false);

    const openOrientationUpload = () => {
        const input = document.getElementById('orientation-input');
        if (input) {
            input.click();
        }
    };

    async function onImageChange(e: any) {
        uploadMediaFile(e.target.files);
    }

    const initializeData = async() => {
        //initializes the questions
        await initializeMedia();
        setDataLoaded(true);
    }

    const deleteCallback = async (id: string, isGreeting?: boolean, isOrientation?: boolean) =>{
        setMediaLoading(true);
        await initializeMedia();
        setMediaLoading(false);
        if(isOrientation){setIsOrientationUploaded(false)}
    }

    const initializeMedia = async () => {
        await GetMedia.initializeMedia("0", "facility");
        setMedia(GetMedia.mediaMetadata);
        setIsOrientationUploaded(GetMedia.orientationUploaded);
    }

    const uploadMediaFile = async (file : File[]) =>{
        setMediaLoading(true);
        for(let i = 0; i < file.length; i++){
            await UploadMediaService.uploadMedia("0", "facility", file[i], undefined, true);
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

                <Dialog disableScrollLock={true} open={mediaLoading} id="loadingScreenDialog">
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

                        <div hidden={isOrientationUploaded}>
                            <button type="button" className="uploadButton" onClick={openOrientationUpload}>+ Add Video</button>
                            <input
                                type="file"
                                accept="video/mp4,video/x-m4v,video/*"
                                style={{display: 'none'}}
                                id="orientation-input"
                                onChange={async (e) => await onImageChange(e)}
                            />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default FacultyUpload