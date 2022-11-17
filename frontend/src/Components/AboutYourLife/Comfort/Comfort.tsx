import { InputLabel, TextField } from "@mui/material";
import '../AboutYourLife.css';
import React from "react";


class Comfort extends React.Component <{}, {isTablet: boolean}>{
    label = "What comforts you most?"
    render(){
        return (
            <div>
                <TextField label={this.label} className="multiLineTexts" name="comfort" variant="filled" rows={4}  multiline></TextField>
            </div>
        );
    }
}

export default Comfort;