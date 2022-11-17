import { InputLabel, TextField } from "@mui/material";
import './MemorableExperiences.css';
import '../AboutYourLife.css';
import React from "react";


class MemorableExperiences extends React.Component <{}, {isTablet: boolean}>{
    label = "Please describe some memorable experiences/family life growing up."
    render(){
        return (
            <div>
                <TextField className="multiLineTexts" name="memorable" label={this.label} variant="outlined" rows={4}  multiline></TextField>
            </div>
        );
    }
}

export default MemorableExperiences;