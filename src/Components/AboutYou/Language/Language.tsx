import { TextField } from "@mui/material";
import React from "react";
import './Language.css';
class Language extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        const label = "What language do you speak?"
        return (
            <div>
                <TextField label={label} className='singleLineText' variant="outlined" size="small" name="language" />
            </div>
            
            // <div id="oneLineResponse">
            //     <label htmlFor="language" id="question">What languages do you speak?</label>
            //     <input type="text" name="language" id="response"/>
            // </div>
        )
    }
}

export default Language;