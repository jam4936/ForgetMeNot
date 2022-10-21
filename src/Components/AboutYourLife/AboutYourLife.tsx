import React from "react";
import LifeSpent from "./LifeSpent/LifeSpent";
import SignificantPlaces from "./SignificantPlaces/SignificantPlaces";
import './AboutYourLife.css';
import MemorableExperiences from "./MemorableExperiences/MemorableExperiences";
import { InputLabel, TextField } from "@mui/material";

class AboutYourLife extends React.Component <{}, {isTablet: boolean}>{


    memorableExperiences = "Please describe some memorable experiences/family life growing up.";
    childhood = "Childhood?";
    adult = "Adult";
    significantPlaces = "Are there any significant places in your life?";
    marriage = "Please describe your marriage and/or adult family life.";
    comfort = "What comforts you the most?";
    lifeEvents = "Are there any significant life events we should know about?";
    religiosAffiliations = "What are your religious/spiritual affiliations, if any?";
    religiousImportant = "Is your religious/spirituality an important aspect of your life? If so, please comment.";
    church="Do you attend church or bible study?";


    render(){
        return (
            <div id="aboutYourLife">
                <h1>About Your Life</h1>
                <LifeSpent></LifeSpent>

                {/* <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField>
                <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField>
                <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField>
                <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField>
                <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField>
                <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField>
                <TextField id="oneLineText" label={this.memorableExperiences} variant="outlined"></TextField> */}



            </div>
        );
    }
}

export default AboutYourLife;