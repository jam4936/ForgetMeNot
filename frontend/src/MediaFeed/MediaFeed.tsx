import React, {useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./MediaFeed.css";
import Media from "../Models/Media";
import Vision from "../Vision/Vision";
import Weather from "../Components/Weather/Weather"
import PatientViewCalendar from "../Components/Calendar/Views/PatientViewCalendar"
import GetMedia from "../Services/GetMedia";
import Patient from "../Models/Patient";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {redirectLoggedIn} from "../Services/getRole";

import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Dialog } from "@mui/material";
import { Puff } from "react-loader-spinner";
import GetVisionConfigs from "../Services/GetVisionConfigs";
import dayjs from "dayjs";
import Config from "../Models/Config";
import isBetween from "dayjs/plugin/isBetween";
import OrientationSlides from "./OrientationSlides";

//THIS NEEDS TO BE CONVERTED TO A CLASS COMPONENT
//THIS IS AN ABSOLUTE MESS OF USE EFFECTS AND STATES

export default function MediaFeed() {
    redirectLoggedIn()
    const location = useLocation();
    const navigate = useNavigate()
    const handle = useFullScreenHandle();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [feedLength, setFeedLength] = useState(0);

    const [state, setState] = useState<boolean>(false);

    const [mediaFiles, setMedia] = useState<Media[]>([]);
    const [orientationVideo, setOrientationVideo] = useState<Media>();
    const [greetingVideo, setGreetingVideo] = useState<Media>();
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [configComplete, setConfigComplete] = useState<boolean>(false);

    const [showWeather, setShowWeather] = useState<boolean>(false);

    const [feedStartTime, setFeedStartTime] = useState<string>("08:00 AM");
    const [feedStopTime, setFeedStopTime] = useState<string>("08:00 PM");
    const [isMorning, setIsMorning] = useState<boolean>(false);
    const [showFeed, setShowFeed] = useState<boolean>(false);

    let slideInterval: string | number | NodeJS.Timer | undefined;
    let intervalTime = 10000;

    const navigateToPatientProfile = (patient : Patient) => {
        navigate('/patientProfile', {state:{id: patient.id, firstName: patient.firstName, lastName: patient.lastName}});
    };

    const patient: Patient = {
        id: location.state != null ? location.state.id : 0,
        firstName: location.state != null ? location.state.firstName : "Test",
        lastName: location.state != null ? location.state.lastName : "Demonstration",
        dob: location.state != null ? location.state.dob : "1955-01-01",
        companyId: location.state != null ? location.state.dob : 11212,
    };

    const initializeMediaFeed = async () => {
        console.log("Initializing Media")
        //Fetch the media files from the patient, and the orientation video from the facility
        await GetMedia.initializeMedia(patient.id.toString(), "patient");
        setMedia(GetMedia.mediaMetadata);
        await GetMedia.initializeMedia(patient.id.toString(), "facility");
        setMedia(mediaFiles => mediaFiles.concat(GetMedia.mediaMetadata));

        //Set up the glance start and stop times
        await GetVisionConfigs.getGlanceStartTime();
        setFeedStartTime( (GetVisionConfigs.configs.at(0) as Config).configValue );
        await GetVisionConfigs.getGlanceStopTime();
        setFeedStopTime( (GetVisionConfigs.configs.at(0) as Config).configValue );

        //Set data loaded to true
        setDataLoaded(true)
    }

    const updateState = (val:boolean)=>{
        // eslint-disable-next-line react/no-direct-mutation-state
        setState(val)
        console.log("Horayy: ", val )
    }

    function isVisible(index:number){
        return index === currentSlide
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? feedLength - 1 : currentSlide - 1);
    };

    const nextSlide = () => {
        setCurrentSlide(currentSlide === feedLength - 1 ? 0 : currentSlide + 1);
    };

    const handleSlideCreation = (slide: Media, index: Number) => {
        const re = /(?:\.([^.]+))?$/;

        if (index === currentSlide && re.exec(slide.objectKey)![1] === "mp4") {
            return (
                <div>
                    <video id={"currentVideo".concat(String(currentSlide))} className="feedImage" hidden={!state} autoPlay onEnded={nextSlide}>
                        <source src={slide.url} type="video/mp4" />
                    </video>
                </div>
            )
        }
        else{
            return (
                <div>
                    <img src={slide.url} alt="slide" hidden={!state} className="feedImage"/>
                </div>
            )
        }
    };

    //Will fetch the mediaFiles at media feed startup
    useEffect(() => {
        initializeMediaFeed()
    }, [])

    //This effect will ensure the mediaFiles are fetched and the feed length is set
    //Depends on the dataLoaded state
    useEffect( () => {
        if (dataLoaded){
            //Extract and delete just the orientation and greeting videos from the fetched media files
            setOrientationVideo(mediaFiles.find((media) => media.isOrientation === true));

            setGreetingVideo(mediaFiles.find((media) => media.isGreeting === true));

            setConfigComplete(true)
        }
    }, [dataLoaded])

    useEffect( () => {
        if (configComplete){
            setMedia(mediaFiles => mediaFiles.filter((media) => media.isGreeting !== true && media.isOrientation !== true));
        }
    }, [configComplete])

    //This effect will track the current time
    useEffect(() => {
        if (configComplete) {
            const startBound = dayjs(feedStartTime, "hh:mm A");
            const stopBound = dayjs(feedStopTime, "hh:mm A");

            // This effect hook will run every second after `dataLoaded` is set to `true`
            const intervalId = setInterval(() => {
                dayjs.extend(isBetween);
                if (dayjs().isBetween(startBound, stopBound)) {
                    if(dayjs().hour() === startBound.hour() && dayjs().minute() === startBound.minute()){
                        console.log("Is morning")
                        setIsMorning(true)
                    }
                    else{
                        console.log("Is not morning")
                        setIsMorning(false)
                    }
                    setShowFeed(true)
                } else {
                    setShowFeed(false)
                }
            }, 1000);

            // Cleanup function to cancel the interval when the component unmounts
            return () => clearInterval(intervalId);
        }
    }, [configComplete]);

    //Effect will track the slide intervals depending on the slideInterval set and if the currentSlide is a video
    //Depends on currentSlide. Everytime currentSlide changes, this effect is called
    useEffect(() => {
        if(configComplete){
            setFeedLength(mediaFiles.length)

            let currentMediaFile = mediaFiles ? mediaFiles[currentSlide] : null
            if (currentMediaFile && showFeed){
                if (/(?:\.([^.]+))?$/.exec(currentMediaFile.objectKey)![1] !== "mp4"){
                    slideInterval = setInterval(nextSlide, intervalTime);

                    return () => clearInterval(slideInterval);
                }
            }
        }
    }, [configComplete,currentSlide]);

    if(!configComplete) {
        return (
            <div>
                <Dialog disableScrollLock={true} open={!configComplete} id="loadingScreenDialog">
                    <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!configComplete} />
                </Dialog>
            </div>
        );
    }else{
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
                            <Vision {...temp} {...{showVision:true}}  />
                            <FullScreen handle={handle}>
                                {showFeed ? (
                                    <div>
                                        {isMorning ? (
                                            <>
                                                <OrientationSlides orientation={orientationVideo} greeting={greetingVideo}></OrientationSlides>
                                            </>
                                        ) : (
                                            <div>
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
                                            </div>
                                        )}

                                    </div>
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
        )
    }
};