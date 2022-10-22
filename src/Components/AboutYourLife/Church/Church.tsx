import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import '../AboutYourLife.css';
import React from "react";
import YesNo from "../../YesNo/YesNo";
import './Church.css'


class Church extends React.Component <{}, {isTablet: boolean}>{
    affiliations = "What are your religious/spiritual affiliations, if any?"
    importance = "Is your religious/spirituality an important aspect of your life? If so, please comment."
    render(){
        return (
            <div>
                <FormControl variant="filled" className="church" fullWidth>
                    <InputLabel id="test">Do you go to church?</InputLabel>
                        <Select labelId="test" id="test">
                            <MenuItem value={"yes"}>Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    
                </FormControl>
            </div>
        );
    }
}

export default Church;