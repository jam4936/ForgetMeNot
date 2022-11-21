import { InputLabel, TextField } from "@mui/material";
import '../AboutYourLife.css';
import React from "react";


class Marraige extends React.Component <{}, {isTablet: boolean}>{
    label = "Please describe your marriage and/or adult family live."
    render(){
        return (
            <div>
                
                <TextField label={this.label} className="multiLineTexts" name="marraige" variant="outlined" rows={4}  multiline></TextField>
            </div>
        );
    }
}

export default Marraige;