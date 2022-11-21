import { InputLabel, TextField } from "@mui/material";
import '../AboutYourLife.css';
import React from "react";


class Religion extends React.Component <{}, {isTablet: boolean}>{
    affiliations = "What are your religious/spiritual affiliations, if any?"
    importance = "Is your religious/spirituality an important aspect of your life? If so, please comment."
    render(){
        return (
            <div>
                <TextField className="multiLineTexts" name="affiliations" label={this.affiliations} variant="filled" rows={4}  multiline></TextField>

                <TextField label={this.importance} className="multiLineTexts" name="importance" variant="filled" rows={4}  multiline></TextField>
            </div>
        );
    }
}

export default Religion;