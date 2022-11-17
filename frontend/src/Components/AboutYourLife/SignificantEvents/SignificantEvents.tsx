import { InputLabel, TextField } from "@mui/material";
import '../AboutYourLife.css';
import React from "react";


class SignificantEvents extends React.Component <{}, {isTablet: boolean}>{
    label = "Are there any significant life events we should know about?"
    render(){
        return (
            <div>
                <TextField label={this.label} className="multiLineTexts" name="events" variant="filled" rows={4}  multiline></TextField>
            </div>
        );
    }
}

export default SignificantEvents;