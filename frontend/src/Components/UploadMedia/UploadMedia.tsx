import React, {useEffect, useRef, useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import { AddImage } from "./AddImage/AddImage"
import Patient from "../../Models/Patient";
import spinner from "../../Images/loadingspinner.gif";
import GetMedia from "../../Services/GetMedia";

export const UploadMedia = (patient : Patient, allowInput: boolean) => {
    const [mediaFiles, setMedia] = useState<String[]>();
    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.media);
        setDataLoaded(true)
        }, [])

    if(dataLoaded){
        return (
            <div id="mediaUpload">

                <section>
                    <div className="imageGrid">
                        {mediaFiles?.map((element: String) => {
                            return <Thumbnail image={element}></Thumbnail>
                        })}
                    </div>

                    <br />

                    <AddImage></AddImage>
                </section>
            </div>
        )
    }else {
        return (
            <div>
                <img id="spinner" src={spinner} alt="loading..." />
            </div>
        )
    }
}