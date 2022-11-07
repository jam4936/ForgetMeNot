import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import './Military.css';
class Military extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div>
            <FormControl variant="filled" className="military">
                <InputLabel id="military">Were you in the military?</InputLabel>
                    <Select labelId="military" id="military">
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                
            </FormControl>
        </div>
            
            // <div>
            //     <div id="yesNoQuestion">
            //         <p>Where you in the military?</p>
            //         <YesNo/>
            //     </div>
                

            //     <div id="yesResponse">
            //         <label htmlFor="branch">Which branch?</label>
            //         <textarea name="branch" id="singleLineResponse"></textarea>
            //     </div>

            // </div>
        )
    }
}

export default Military;