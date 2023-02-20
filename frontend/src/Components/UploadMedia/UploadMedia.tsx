import React, {useState} from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import { AddImage } from "./AddImage/AddImage"
import Patient from "../../Models/Patient";
import spinner from "../../Images/loadingspinner.gif";
import GetMedia from "../../Services/GetMedia";
import Media from "../../Models/Media";

export const UploadMedia = (patient : Patient, allowInput: boolean) => {
    const [mediaFiles, setMedia] = useState<Media[]>();

    const initializeMedia = async () => {
        await GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.mediaMetadata);
    }

    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const initializeData = async () => {
        //initializes the questions
        await initializeMedia();
        // set data as loaded
        setDataLoaded(true);
    }

    if(!dataLoaded) initializeData();

    if(dataLoaded){
        return (
            <div id="mediaUpload">

                <section>
                    <div className="imageGrid">
                        {mediaFiles?.map((element) => {
                            return <Thumbnail image={element}></Thumbnail>
                        })}
                    </div>

                    <br />

                    {AddImage(patient, allowInput)}
                </section>
            </div>
        )
    }else {
        return (
            <div>
                <img id="spinner" src={spinner} alt="loading..." />
                {AddImage(patient, allowInput)}
            </div>
        )
    }
}