import { TextField } from "@mui/material";
import React from "react";


class MemorableExperiences extends React.Component <{}, {isTablet: boolean}>{
    label = "Please describe some memorable experiences/family life growing up."
    render(){
        return (
            <div>
                <TextField id="test" label={this.label} variant="outlined"></TextField>
            </div>
        );
    }
}

export default MemorableExperiences;