import { useState, useEffect } from "react";
import { mediaFeedData } from "./MediaFeedData";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import "./MediaFeed.css";

export default function MediaFeed() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const feedLength = mediaFeedData.length;

    let slideInterval: string | number | NodeJS.Timer | undefined;
    let intervalTime = 10000;

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
        <div className="mediaFeed">
            <IconButton size="large" id="enterFullscreen">
                <OpenInFullIcon fontSize="inherit"></OpenInFullIcon>
            </IconButton>
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
        </div>
    );
};