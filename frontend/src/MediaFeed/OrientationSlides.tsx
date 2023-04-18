import React from "react";
import "./MediaFeed.css";
import Vision from "../Vision/Vision";
import Weather from "../Components/Weather/Weather"
import PatientViewCalendar from "../Components/Calendar/Views/PatientViewCalendar"

class OrientationSlides extends React.Component<{ greeting: any; orientation: any }, { currentSlide: number }> {

    constructor(props: { greeting: any; orientation: any }) {
        super(props);
        this.state = {
            currentSlide: 0,
        };
    }

    isVisible(index: number) {
        return index === this.state.currentSlide
    }

    handleVideoEnd = () => {
        this.setState(prevState => ({ currentSlide: (prevState.currentSlide + 1) % 3 }));
    }

    render() {

        return (
            <>
                <div className={this.isVisible(0) ? "slide current" : "slide"} key={0}>
                    <video className="feedImage" autoPlay onEnded={this.handleVideoEnd}>
                        <source src={this.props.greeting.url} type="video/mp4"/>
                    </video>
                </div>

                <div className={this.isVisible(1) ? "slide current" : "slide"} key={1}>
                    <video className="feedImage" autoPlay onEnded={this.handleVideoEnd}>
                        <source src={this.props.orientation.url} type="video/mp4"/>
                    </video>
                </div>

                <div className={this.isVisible(2) ? "slide current" : "slide"} key={2}>
                    <PatientViewCalendar></PatientViewCalendar>
                </div>
            </>
        )

    }
}

export default OrientationSlides;