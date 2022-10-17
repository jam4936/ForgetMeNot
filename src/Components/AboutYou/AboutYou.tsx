
import React from "react";
import Birthplace from "./Birthplace/Birthplace";
import Education from "./Education/Education";
import Language from "./Language/Language";
import Occupation from "./Occupation/Occupation";
import PersonalityTraits from "./PersonalityTraits/PersonalityTraits";
import './AboutYou.css';
import Military from "./Military/Military";
import Family from "./Family/Family";
import FoodPreference from "./FoodPreference/FoodPreference";
import Bathing from "./Bathing/Bathing";

class AboutYou extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div id="aboutYou">
                <Birthplace></Birthplace>
                <Language></Language>
                <PersonalityTraits></PersonalityTraits>
                <Education></Education>
                <Occupation></Occupation>
                <Military></Military>
                <Family></Family>
                <FoodPreference></FoodPreference>
                <Bathing></Bathing>
            </div>
        );
    }
}

export default AboutYou;