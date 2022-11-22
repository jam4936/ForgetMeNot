import React, { useState, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { mediaFeedData } from "./MediaFeedData";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import "./MediaFeed.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function MediaFeed() {
    const handle = useFullScreenHandle();
    const [currentSlide, setCurrentSlide] = useState(0);
    const feedLength = mediaFeedData.length;

    let slideInterval: string | number | NodeJS.Timer | undefined;
    let intervalTime = 10000;

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? feedLength - 1 : currentSlide - 1);
    };

    const nextSlide = () => {
        setCurrentSlide(currentSlide === feedLength - 1 ? 0 : currentSlide + 1);
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        auto();
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <div id="feedContainer">
            <div className="mediaFeed">
                <IconButton size="large" id="enterFullscreen" onClick={handle.enter}>
                    <OpenInFullIcon fontSize="inherit"></OpenInFullIcon>
                </IconButton>
                <FullScreen handle={handle}>
                    {mediaFeedData.map((slide, index) => {
                        return (
                            <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                                {index === currentSlide && (
                                    <div>
                                        <img src={slide.image} alt="slide" className="image" />
                                    </div>
                                )}
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
    );
};