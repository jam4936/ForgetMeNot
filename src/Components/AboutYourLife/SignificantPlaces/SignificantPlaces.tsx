import { InputLabel, TextField } from "@mui/material";
import React from "react";
import './SignificantPlaces.css';
class SignificantPlaces extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        var label = "Are there any significant places in your life?"
        return (
            <div id="multilineResponse">
                <TextField label={label} className='multiLineText' variant="outlined" size="small" name="significant" />
            </div>
        )
    }
}

export default SignificantPlaces;