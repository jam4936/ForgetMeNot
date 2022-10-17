
import React from "react";
import Birthplace from "./Birthplace/Birthplace";
import Education from "./Education/Education";
import Language from "./Language/Language";
import PersonalityTraits from "./PersonalityTraits/PersonalityTraits";

class AboutYou extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div>
                <Birthplace></Birthplace>
                <Language></Language>
                <PersonalityTraits></PersonalityTraits>
                <Education></Education>
            </div>
        );
    }
}

export default AboutYou;