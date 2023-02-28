import React, {useState, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import "./MediaFeed.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useLocation, useNavigate} from "react-router-dom";
import Patient from "../Models/Patient";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GetMedia from "../Services/GetMedia";
import spinner from "../Images/loadingspinner.gif";
import Media from "../Models/Media";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import Vision from "../Vision/Vision";

export default function MediaFeed() {
    const location = useLocation();
    const navigate = useNavigate()
    const handle = useFullScreenHandle();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [feedLength, setFeedLength] = useState(0);

    const [mediaFiles, setMedia] = useState<Media[]>();
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    let state = false;
    let slideInterval: string | number | NodeJS.Timer | undefined;
    let intervalTime = 10000;

    const navigateToPatientProfile = (patient : Patient) => {
        navigate('/patientProfile', {state:{id: patient.id, firstName: patient.firstName, lastName: patient.lastName}});
    };

    const patient: Patient = {
        id: location.state != null ? location.state.id : 0,
        firstName: location.state != null ? location.state.firstName : "Test",
        lastName: location.state != null ? location.state.lastName : "Demonstration"
    };

    const initializeMedia = async () => {
        await GetMedia.initializeMedia(patient.id.toString());
        setMedia(GetMedia.mediaMetadata);
    }

    const updateState = (val:boolean)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        state=val
        console.log("Horayy: ", val )
    }   

    function isVisible(index:number){
        if(state){
            console.log('something should be off')
            return false
           
        }
        else{
            return index === currentSlide
        }
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? feedLength - 1 : currentSlide - 1);
    };

    const nextSlide = () => {
        if(state){
            
        }
        else{
            setCurrentSlide(currentSlide === feedLength - 1 ? 0 : currentSlide + 1);
        }
        
    };

    const handleSlideCreation = (slide: Media, index: Number) => {
        const re = /(?:\.([^.]+))?$/;
        
        if (index === currentSlide && re.exec(slide.objectKey)![1] === "mp4") {
            return (
                <div>
                    <video autoPlay>
                        <source src={slide.url} type="video/mp4" />
                    </video>
                </div>
            )
        }
        else{
            return (
                <div>
                    <img src={slide.url} alt="slide" className="image"/>
                </div>
            )
        }
    };

    useEffect(() => {
        initializeMedia()
        setDataLoaded(true)
    }, [])

    useEffect( () => {
        if (mediaFiles) setFeedLength(mediaFiles.length);
    }, [mediaFiles])

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        auto();
        return () => clearInterval(slideInterval);
    }, [currentSlide]);
    
    if(dataLoaded) {
        let temp = {updateFN:updateState,debug:false}
        return (
            <>
            
            <div id="mediaFeed">
                <div id="arrowButton">
                    <IconButton size="large" onClick={() => navigateToPatientProfile(patient)}>
                        <ArrowBackIcon fontSize="inherit"></ArrowBackIcon>
                    </IconButton>
                </div>
                <div id="feedContainer">
                    <div className="mediaView">
                        <IconButton size="large" id="enterFullscreen" onClick={handle.enter}>
                            <OpenInFullIcon fontSize="inherit"></OpenInFullIcon>
                        </IconButton>
                        <Vision {...temp} />
                        <FullScreen handle={handle}>
                            {mediaFiles?.map((slide, index) => {
                                return (
                                    <div className={isVisible(index) ? "slide current" : "slide"} key={index}>
                                        {handleSlideCreation(slide,index)}
                                    </div>
                                );
                            })}
                        </FullScreen>
                    </div>
                    <div id="feedOptions">
                        <IconButton size="large" onClick={prevSlide}>
                            <ArrowCircleLeftIcon fontSize="inherit"></ArrowCircleLeftIcon>
                        </IconButton>
                        <IconButton size="large" onClick={nextSlide}>
                            <ArrowCircleRightIcon fontSize="inherit"></ArrowCircleRightIcon>
                        </IconButton>
                    </div>
                </div>
            </div>
        </>

        );
    }else{
        return (
            <div>
                <img id="spinner" src={spinner} alt="loading..." />
            </div>
        )
    }
};