import { Input, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";


class YesNo extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div>
                <InputLabel id="test">Yes/No</InputLabel>
                <Select labelId="test">
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                </Select>
                
                {/* <select defaultValue={"none"}>
                    <option value="none" disabled hidden>Select an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select> */}
            </div>
        );
    }
}

export default YesNo;