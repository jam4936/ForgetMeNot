import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
class Bathing extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div>
            <FormControl variant="filled" className="church" fullWidth>
                <InputLabel id="test">Do you go to church?</InputLabel>
                    <Select labelId="test" id="test">
                        <MenuItem value={"bath"}>Bath</MenuItem>
                        <MenuItem value="shower">Shower</MenuItem>
                    </Select>
                
            </FormControl>
        </div>
            // <div id="singleLineResponse">
            //     <label htmlFor="bathing">Do you prefer a bath or shower?</label>
            //     <select name="bathing">
            //         <option value="">---Select One---</option>
            //         <option value="bath">Bath</option>
            //         <option value="shower">Shower</option>
            //     </select>
            // </div>
        )
    }
}

export default Bathing;