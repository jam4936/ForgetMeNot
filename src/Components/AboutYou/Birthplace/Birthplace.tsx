import { TextField } from "@mui/material";
import React from "react";
import './Birthplace.css';

class Birthplace extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        const label="Where were you born?"
        return (
            <div>
                <TextField label={label} className='singleLineText' variant="outlined" size="small" name="significant" />
            </div>
            // <div id="oneLineResponse">
            //     <label htmlFor="birthplace" id="question">Where were you born?</label>
            //     <input type="text" name="birthplace" id="response"/>
            // </div>
        )
    }
}

export default Birthplace;