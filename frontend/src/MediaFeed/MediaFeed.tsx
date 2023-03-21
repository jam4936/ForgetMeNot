import React, {useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./MediaFeed.css";
import Media from "../Models/Media";
import Vision from "../Vision/Vision";
import Weather from "../Components/Weather/Weather"
import spinner from "../Assets/loadingspinner.gif";
import GetMedia from "../Services/GetMedia";
import Patient from "../Models/Patient";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThermostatIcon from '@mui/icons-material/Thermostat';

export default function MediaFeed() {
    const location = useLocation();
    const navigate = useNavigate()
    const handle = useFullScreenHandle();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [feedLength, setFeedLength] = useState(0);

    const [mediaFiles, setMedia] = useState<Media[] | undefined>();
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [showWeather, setShowWeather] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    let state = false;
    let slideInterval: string | number | NodeJS.Timer | undefined;
    let intervalTime = 10000;
    let startTime = 16;
    let stopTime = 20;

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
        setDataLoaded(true)
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
                    <video id={"currentVideo".concat(String(currentSlide))} preload="metadata" autoPlay>
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

    //Will fetch the mediaFiles at media feed startup
    useEffect(() => {
        initializeMedia()
    }, [])

    //This effect will ensure the mediaFiles are fetched and the feed length is set
    //Depends on the mediaFiles state
    useEffect( () => {
        if (mediaFiles) setFeedLength(mediaFiles.length);
    }, [mediaFiles])

    //This effect will track the current time
    useEffect(() => {
        let timer = setInterval(()=>setCurrentTime(new Date()), 1000 )
        return () => clearInterval(timer);
    });

    //Effect will track the slide intervals depending on the slideInterval set and if the currentSlide is a video
    //Depends on currentSlide. Everytime currentSlide changes, this effect is called
    useEffect(() => {
        let currentMediaFile = mediaFiles ? mediaFiles[currentSlide] : null
        if (currentMediaFile){
            if (/(?:\.([^.]+))?$/.exec(currentMediaFile.objectKey)![1] === "mp4"){
                let videoDuration = (document.getElementById("currentVideo" + currentSlide) as HTMLVideoElement)
                videoDuration.onloadedmetadata = function() {
                    slideInterval = setInterval(nextSlide, videoDuration.duration*1000);
                };
            }
            else{
                slideInterval = setInterval(nextSlide, intervalTime);
            }
        }
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
                            <Vision {...temp} {...{showVision:false}}  />
                            <FullScreen handle={handle}>
                                {currentTime.getHours() >= startTime && currentTime.getHours() <= stopTime ? (
                                    <>
                                        {mediaFiles?.map((slide, index) => {
                                            return (
                                                <div className={isVisible(index) ? "slide current" : "slide"} key={index}>
                                                    {handleSlideCreation(slide,index)}
                                                </div>
                                            );
                                        })}
                                        <IconButton size="large" onClick={() => {setShowWeather(prevCheck => !prevCheck)}}>
                                            <ThermostatIcon fontSize="inherit"></ThermostatIcon>
                                        </IconButton>
                                        {showWeather && <Weather></Weather>}
                                    </>
                                    ) : (
                                    <div>
                                    </div>
                                    )}
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