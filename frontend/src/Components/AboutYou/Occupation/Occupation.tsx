import { TextField } from "@mui/material";
import React from "react";
class Occupation extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        const label="What is your occupation/work history?";
        return (
            <div>
                <TextField label={label} className='singleLineText' variant="outlined" size="small" name="significant" />
            </div>
            // <div id="multilineResponse">
            //     <label htmlFor="occupation">What is your occupation/work history?</label>
            //     <textarea name="occupation" id="multilineResponseInput"></textarea>
            // </div>
        )
    }
}

export default Occupation;