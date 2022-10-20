import React from "react";
import LifeSpent from "./LifeSpent/LifeSpent";
import SignificantPlaces from "./SignificantPlaces/SignificantPlaces";
import './AboutYourLife.css';

class AboutYourLife extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div id="aboutYourLife">
                <LifeSpent></LifeSpent>
                <SignificantPlaces></SignificantPlaces>
            </div>
        );
    }
}

export default AboutYourLife;